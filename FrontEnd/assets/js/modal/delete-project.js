import { fetchProjects } from "../fetch.js";

document.addEventListener('DOMContentLoaded', async () => {
    let editProjectLink = document.querySelector('#edit-project-modal');
    let closeModalButtons = document.querySelectorAll('.close-btn');
    let editProjectModals = document.querySelectorAll('.modal-wdws');
    let modalGallery = document.querySelector('.modal-gallery');

    async function deleteProject(projectId) {
        const authToken = sessionStorage.getItem('authToken');
        try {
            await fetch(`http://localhost:5678/api/works/${projectId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            let classToDelete = '.project-gallery-' + projectId;
            console.log('elementtodelete : ' + classToDelete)
            let elementToDelete = document.querySelectorAll(classToDelete);
            console.log(elementToDelete)
            elementToDelete.forEach(element => {
                element.remove();
            });
    
            console.log('Projet supprimé avec succès.');

            // Update modal gallery after deleting a project
            let updatedProjects = await fetchProjects();
            removeAllDeleteListeners();
            showModalProjects(updatedProjects);

    
        } catch (error) {
            console.error('Erreur dans la suppression du projet individuel:', error);
            throw error; // Répéter l'erreur pour que l'appelant (l'écouteur d'événements) puisse également la gérer.
        }
    }
    
    async function deleteAllProject() {
        const authToken = sessionStorage.getItem('authToken');
        try {
            const allProjects = await fetchProjects();

            // Supprimer chaque projet individuellement en utilisant son ID
            const deleteRequests = allProjects.map((project) => {
                return fetch(`http://localhost:5678/api/works/${project.id}`, {
                    method: 'DELETE',
                    headers: {
                    'Authorization': `Bearer ${authToken}`,
                    },
                });
            });

            // Attendre que toutes les requêtes de suppression soient terminées
            await Promise.all(deleteRequests);

            let elementToDelete = document.querySelectorAll('figure');
            elementToDelete.forEach(element => {
                element.remove();
            })

            // Suppression réussie, mettre à jour la galerie
            let updatedProjects = await fetchProjects();
            modalGallery.innerHTML = '';
            showModalProjects(updatedProjects);
            console.log('Tous les projets ont été supprimés avec succès.');


        } catch (error) {
            console.error('Une erreur est survenue lors de la suppression des projets :', error);
            throw error; // Répéter l'erreur pour que l'appelant (l'écouteur d'événements) puisse également la gérer.
        }
    }

    function removeAllDeleteListeners() {
        const deleteIcons = document.querySelectorAll('.project-gallery img[src="assets/icons/delete-icon.png"]');
        deleteIcons.forEach(icon => {
            const newIcon = icon.cloneNode(true);
            icon.parentNode.replaceChild(newIcon, icon);
        });
    };

    function addDeleteListener(deleteIcon, projectId) {
        deleteIcon.addEventListener('click', async () => {
            try {
                await deleteProject(projectId);
                let updatedProjects = await fetchProjects();
                removeAllDeleteListeners();
                showModalProjects(updatedProjects);
            } catch (error) {
                console.error('Erreur dans la suppression du projet individuel :', error);
            }
        });
    };

    function showModalProjects(galleryData) {
        modalGallery.innerHTML = '';

        for (let i = 0; i < galleryData.length; i++) {
            let project = galleryData[i];

            let galleryProject = document.createElement('figure');
            galleryProject.classList.add('project-gallery-' + project.id);
            let imageContainer = document.createElement('div');
            let imageProject = document.createElement('img');
            let titleProject = document.createElement('figcaption');
            let deleteIcon = document.createElement('img'); 

            imageProject.src = project.imageUrl;
            titleProject.innerText = 'éditer';
            deleteIcon.src = 'assets/icons/delete-icon.png';

            modalGallery.appendChild(galleryProject);
            galleryProject.appendChild(imageContainer);
            imageContainer.appendChild(imageProject);
            imageContainer.appendChild(deleteIcon);
            galleryProject.appendChild(titleProject);

            imageContainer.style.position = 'relative';
            deleteIcon.style.position = 'absolute';
            deleteIcon.style.top = '5px';
            deleteIcon.style.right = '5px';
            deleteIcon.style.width = '17px';
            deleteIcon.style.height = '17px';

            addDeleteListener(deleteIcon, project.id);
        }

        let galleryDeleteBtn = document.querySelector('.gallery-delete-btn');
        galleryDeleteBtn.addEventListener('click', async () => {
            try {
                await deleteAllProject();
                modalGallery.innerHTML = '';
            } catch (error) {
                console.error('Une erreur est survenue lors de la suppression des projets :', error);
            }
        });
    };

    function closeModal(event) {
        event.preventDefault();
        let modalToClose = event.target.closest('.modal-wdws');
        modalToClose.style.display = 'none';
    };

    function openModal(event) {
        event.preventDefault();
        editProjectModals.forEach((modal) => {
            modal.style.display = 'flex';
        });
        fetchProjects()
        .then(galleryData => {
            showModalProjects(galleryData);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
    };

    editProjectLink.addEventListener("click", openModal);

    closeModalButtons.forEach(function (button) {
        button.addEventListener('click', closeModal);
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal-wdws')) {
            closeModal(event);
        }
    });

    // Back button function

    let backBtn = document.querySelector('.back-btn');

    backBtn.addEventListener('click', async () => {
        let modal1 = document.querySelector('.modal-wdw1');
        let modal2 = document.querySelector('.modal-wdw2');

        modal1.style.display = 'flex';
        modal2.style.display = 'none';

        // Update projects list in modal gallery after adding a project
        try {
            let updatedProjects = await fetchProjects();
            modalGallery.innerHTML = '';
            showModalProjects(updatedProjects);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    });
});

// Pathway between delete-project wdw1 and add-project wdw2

let btn = document.querySelector('.pjct-add-btn');

btn.addEventListener('click', () => {
  let modal1 = document.querySelector('.modal-wdw1');
  let modal2 = document.querySelector('.modal-wdw2');

  modal1.style.display = 'none';
  modal2.style.display = 'block';
});
import { fetchProjects } from '../fetch.js';

let galleryData = await fetchProjects();

function showModalProjects(galleryData) {
  let modalGallery = document.querySelector('.modal-gallery');
  modalGallery.innerHTML = '';

  for (let i = 0; i < galleryData.length; i++) {
    let project = galleryData[i];

    let galleryProject = document.createElement('figure');
    galleryProject.classList.add('project-gallery-'+ project.id);
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

    // Delete a project by id button
    deleteIcon.addEventListener('click', async () => {
      try {
        await deleteProject(project.id);
        let updatedProjects = await fetchProjects(); // Récupère les projets mis à jour après la suppression
        showModalProjects(updatedProjects);
      } catch (error) {
        console.error('Erreur dans la suppression du projet individuel :', error);
      }
    });
  }

    // Delete all gallery projects button
    const galleryDeleteBtn = document.querySelector('.gallery-delete-btn');
    galleryDeleteBtn.addEventListener('click', async () => {
      try {

        await deleteAllProject();
        // Empty the gallery container
        modalGallery.innerHTML = '';
      } catch (error) {
        console.error('Une erreur est survenue lors de la suppression des projets :', error);
      }
    });
}

async function deleteProject(projectId) {
  const authToken = sessionStorage.getItem('authToken');
  try {
    let response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      console.error('Erreur dans la suppression du projet individuel:', response);
      throw new Error('Réponse réseau erronée');
    }
    let classToDelete = '.project-gallery-' + projectId;
    let elementToDelete = document.querySelectorAll(classToDelete);
    elementToDelete.forEach(element => {
      element.remove();
    })

    console.log('Projet supprimé avec succès.');

  } catch (error) {
    // Gérer les erreurs éventuelles lors de la suppression du projet individuel
    console.error('Erreur dans la suppression du projet individuel:', error);
    throw error; // Répéter l'erreur pour que l'appelant (l'écouteur d'événements) puisse également la gérer.
  }
};

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

    console.log('Tous les projets ont été supprimés avec succès.');

  } catch (error) {
    console.error('Une erreur est survenue lors de la suppression des projets :', error);
    throw error; // Répéter l'erreur pour que l'appelant (l'écouteur d'événements) puisse également la gérer.
  }
}

showModalProjects(galleryData);


// Pathway between delete-project wdw1 and add-project wdw2

let btn = document.querySelector('.pjct-add-btn');

btn.addEventListener('click', () => {
  let modal1 = document.querySelector('.modal-wdw1');
  let modal2 = document.querySelector('.modal-wdw2');

  modal1.style.display = 'none';
  modal2.style.display = 'block';
});
import { fetchProjects } from '../fetch.js';

let dataProjects = await fetchProjects();

function showProjects(dataProjects) {
  let gallery = document.querySelector('.modal-gallery');
  gallery.innerHTML = '';

  for (let i = 0; i < dataProjects.length; i++) {
    let project = dataProjects[i];

    let galleryProject = document.createElement('figure');
    let imageContainer = document.createElement('div');
    let imageProject = document.createElement('img');
    let titleProject = document.createElement('figcaption');
    let deleteIcon = document.createElement('img'); 

    imageProject.src = project.imageUrl;
    titleProject.innerText = 'éditer';
    deleteIcon.src = 'assets/icons/delete-icon.png'; 

    gallery.appendChild(galleryProject);
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

    deleteIcon.addEventListener('click', () => {
      deleteProject(project.id);
      fetchProjects().then(updatedProjects => showProjects(updatedProjects));
    });

    // Delete all gallery projects button

    const galleryDeleteBtn = document.querySelector('.gallery-delete-btn');
    galleryDeleteBtn.addEventListener('click', async () => {
     await deleteAllProject('.modal-gallery figure');
    });
  }
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
      console.error('Erreur dans la suppression du projet:', response);
      throw new Error('Réponse réseau erronée');
    }

  } catch (error) {
    // Handle any errors that occurred during the fetch request
    console.error('Erreur dans la suppression du projet:', error);
  }};

async function deleteAllProject () {

  const authToken = sessionStorage.getItem('authToken');

  try {
    const gallery = document.querySelector('.modal-gallery');
    const elementsToDelete = gallery.querySelectorAll(`.modal-gallery figure`);

    for (const element of elementsToDelete) {
      const response = await fetch(`http://localhost:5678/api/works/${element.dataset.projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        console.error('Erreur lors de la suppression des projets');
      } else {
        console.log('Tous les projets ont été supprimés avec succès');
      }
    }

    // If needed, handle the success response here
  } catch (error) {
    console.error('Erreur lors de la suppression des projets:', error);
  }
}

showProjects(dataProjects);





// Pathway between modal gallery delete projects and modal window add projects

let btn = document.querySelector('.pjct-add-btn');

btn.addEventListener('click', () => {
  let modal1 = document.querySelector('.modal-wdw1');
  let modal2 = document.querySelector('.modal-wdw2');

  modal1.style.display = 'none';
  modal2.style.display = 'block';
});
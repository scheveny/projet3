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

    deleteIcon.addEventListener('click', () => {
      deleteProject(project.id);
      fetchProjects().then(updatedProjects => showProjects(updatedProjects));
    });
  }
}

async function deleteProject(projectId) {

  const authToken = sessionStorage.getItem('authToken');

  try {
    const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      console.error('Erreur dans la suppression du projet:', response);
      throw new Error('Réponse réseau erronée');
    }

    // Handle the success response here if needed
    console.log('Le projet a été supprimé avec succès');
  } catch (error) {
    // Handle any errors that occurred during the fetch request
    console.error('Erreur dans la suppression du projet:', error);
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

// Delete all projects button

let deleteBtn = document.querySelector('.gallery-delete-btn');

deleteBtn.addEventListener('click', () => {
  let projectList = document.querySelector('.modal-gallery figure');
  projectList.innerHTML = '';
});
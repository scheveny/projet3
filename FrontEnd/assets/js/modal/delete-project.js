import { fetchProjects } from '../fetch.js';

let galleryData = await fetchProjects();

function showProjects(galleryData) {
  let gallery = document.querySelector('.modal-gallery');
  gallery.innerHTML = '';

  for (let i = 0; i < galleryData.length; i++) {
    let project = galleryData[i];

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
    deleteIcon.addEventListener('click', async () => {
      try {
        await deleteProject(project.id);
        // Remove the deleted project's DOM element
        gallery.removeChild(galleryProject);

        // Fetch the updated projects and populate the gallery
        let updatedProjects = await fetchProjects();
        showProjects(updatedProjects);
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
        gallery.innerHTML = '';
        
        // Fetch the updated projects and populate the gallery
        let updatedProjects = await fetchProjects();
        showProjects(updatedProjects);
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

    console.log('Tous les projets ont été supprimés avec succès.');

  } catch (error) {
    console.error('Une erreur est survenue lors de la suppression des projets :', error);
    throw error; // Répéter l'erreur pour que l'appelant (l'écouteur d'événements) puisse également la gérer.
  }
}

showProjects(galleryData);

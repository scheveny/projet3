// Afficher tous les projets au chargement initial
import { fetchProjects } from '../fetch.js';

let dataProjects = await fetchProjects();

// Afficher tous les projets au chargement initial
showProjects(dataProjects);

function showProjects(dataProjects) {
  let gallery = document.querySelector('.modal-gallery');
  gallery.innerHTML = '';

  for (let i = 0; i < dataProjects.length; i++) {
    let project = dataProjects[i];

    let galleryProject = document.createElement('figure');
    let imageContainer = document.createElement('div'); // Conteneur pour l'image et l'icône de suppression
    let imageProject = document.createElement('img');
    let titleProject = document.createElement('figcaption');
    let deleteIcon = document.createElement('img'); 

    imageProject.src = project.imageUrl;
    titleProject.innerText = 'éditer';
    deleteIcon.src = 'assets/icons/delete-icon.png'; 

    gallery.appendChild(galleryProject);
    galleryProject.appendChild(imageContainer);
    imageContainer.appendChild(imageProject);
    imageContainer.appendChild(deleteIcon); // Ajouter l'icône de suppression dans le conteneur avec l'image
    galleryProject.appendChild(titleProject);

    // Appliquer les styles pour superposer l'icône en haut à droite
    imageContainer.style.position = 'relative';
    deleteIcon.style.position = 'absolute';
    deleteIcon.style.top = '5px';
    deleteIcon.style.right = '5px';
    deleteIcon.style.width = '17px';
    deleteIcon.style.height = '17px';
  }
}

showProjects(dataProjects);
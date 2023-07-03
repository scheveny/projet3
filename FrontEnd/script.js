async function fetchProjects() {
  try {
    let response = await fetch('http://localhost:5678/api/works');
    let data = await response.json();

    return data;
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}

async function displayProjects() {
  let gallery = document.querySelector('.gallery');
  let dataProjects = await fetchProjects();

  for (let i = 0; i < dataProjects.length; i++) {
    let project = dataProjects[i];

    // Créer les éléments HTML pour chaque projet
    let galleryProject = document.createElement('figure');
    let imageProject = document.createElement('img');
    let titleProject = document.createElement('figcaption');

    // Définir les attributs et le contenu des éléments
    imageProject.src = project.imageUrl;
    titleProject.textContent = project.title;

    // Ajouter les éléments à la galerie
    gallery.appendChild(galleryProject);
    galleryProject.appendChild(imageProject);
    galleryProject.appendChild(titleProject);
  }
}

// Pour s'assurer que le contenu de la page est complètement chargé avant d'appeler displayProjects()
document.addEventListener('DOMContentLoaded', () => {
  displayProjects();
});
async function fetchProjects() {
  try {
    let response = await fetch('http://localhost:5678/api/works');
    let data = await response.json();

    return data;
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    return [];
  }
}

async function displayProjects() {
  let gallery = document.querySelector('.gallery');
  let dataProjects = await fetchProjects();
  let categoryButtons = document.querySelectorAll('.category-buttons button');

  // Filtrer les projets en fonction de la catégorie sélectionnée
  function filterProjects(category) {
    if (category === 'all') {
      return dataProjects;
    } else {
      return dataProjects.filter(project => project.category.id === parseInt(category));
    }
  }

  // Afficher les projets dans la galerie
  function showProjects(projects) {
    gallery.innerHTML = '';

    for (let i = 0; i < projects.length; i++) {
      let project = projects[i];

      let galleryProject = document.createElement('figure');
      let imageProject = document.createElement('img');
      let titleProject = document.createElement('figcaption');

      imageProject.src = project.imageUrl;
      titleProject.textContent = project.title;

      gallery.appendChild(galleryProject);
      galleryProject.appendChild(imageProject);
      galleryProject.appendChild(titleProject);
    }
  }

  // Afficher tous les projets
  function showAllProjects() {
    showProjects(dataProjects);
  }

  // Gérer les clics sur les boutons de catégorie
  for (let i = 0; i < categoryButtons.length; i++) {
    let button = categoryButtons[i];

    button.addEventListener('click', () => {
      let selectedCategory = button.dataset.category;
      let filteredProjects = filterProjects(selectedCategory);
      showProjects(filteredProjects);
    });
  }

  // Afficher tous les projets au chargement initial
  showAllProjects();
}

document.addEventListener('DOMContentLoaded', () => {
  displayProjects();
});
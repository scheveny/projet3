import { fetchProjects } from './fetch.js'

let galleryData = await fetchProjects();

// Afficher tous les projets au chargement initial
showProjects(galleryData);

function showProjects(galleryData) {
  let gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  for (let i = 0; i < galleryData.length; i++) {
    let project = galleryData[i];

    let galleryProject = document.createElement('figure');
    galleryProject.classList.add('project-gallery-' + project.id);
    let imageProject = document.createElement('img');
    let titleProject = document.createElement('figcaption');

    imageProject.src = project.imageUrl;
    titleProject.textContent = project.title;

    gallery.appendChild(galleryProject);
    galleryProject.appendChild(imageProject);
    galleryProject.appendChild(titleProject);
  }
}

function filterProjects(category) {
  if (category === 'all') {
    return galleryData;
  } else {
    return galleryData.filter(project => project.category.id === parseInt(category));
  }
}

let categoryButtons = document.querySelectorAll('.category-buttons button');

categoryButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // Récupérer la catégorie sélectionnée
    let selectedCategory = button.dataset.categoryId;

    // Filtrer les projets en fonction de la catégorie sélectionnée
    let filteredProjects = filterProjects(selectedCategory);

    // Afficher les projets filtrés
    showProjects(filteredProjects);

    // Ajouter la classe 'cat-btns-active' au bouton cliqué
    categoryButtons.forEach(function(btn) {
      if (btn === button) {
        btn.classList.add('cat-btns-active');
      } else {
        btn.classList.remove('cat-btns-active');
      }
    });
  });
});
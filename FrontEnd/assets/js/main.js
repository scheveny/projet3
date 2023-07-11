let dataProjects = [];

async function fetchProjects() {
  try {
    let response = await fetch('http://localhost:5678/api/works');
    let data = await response.json();
    dataProjects = data;
    return data;
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    return [];
  }
}


function showProjects(projects) {
  let gallery = document.querySelector('.gallery');
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

function filterProjects(category) {
  if (category === 'all') {
    return dataProjects;
  } else {
    return dataProjects.filter(project => project.category.id === parseInt(category));
  }
}

document.addEventListener('DOMContentLoaded', displayProjects);
async function displayProjects() {
  let categoryButtons = document.querySelectorAll('.category-buttons button');

  // Gérer les clics sur les boutons de catégorie
  for (let i = 0; i < categoryButtons.length; i++) {
    let button = categoryButtons[i];
    button.addEventListener('click', (event) => {
      let selectedCategory = button.dataset.categoryId;
      let filteredProjects = filterProjects(selectedCategory);
      showProjects(filteredProjects);
    });
  }

  // Fetcher les projets une seule fois au chargement initial
  await fetchProjects();

  // Afficher tous les projets au chargement initial
  showProjects(dataProjects);
}
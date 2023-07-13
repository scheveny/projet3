import { fetchProjects } from './assets/js/fetch.js'


  let dataProjects = await fetchProjects();
  
  // Afficher tous les projets au chargement initial
  showProjects(dataProjects);
  
  function showProjects(dataProjects) {
    let gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
  
    for (let i = 0; i < dataProjects.length; i++) {
      let project = dataProjects[i];
  
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
  
  let categoryButtons = document.querySelectorAll('.category-buttons button');
  categoryButtons.forEach(function(button){
    button.addEventListener('click', (event) => {
      let selectedCategory = button.dataset.categoryId;
      let filteredProjects = filterProjects(selectedCategory);
      showProjects(filteredProjects);
      event.target.classList.add('cat-btns-active');
    });
  })
  

async function fetchProjects() {
      const response = await fetch('http://localhost:5678/api/');
      const dataProjects = await response.json();
      const gallery = document.querySelector('.gallery');

  
      for (let i = 0; i < dataProjects.length; i++) {
        const project = dataProjects[i];

        // Créer les éléments HTML pour chaque projet
        const galleryProject = document.createElement('figure');
        const imageProject = document.createElement('img');
        const titleProject = document.createElement('figcaption');
  
        // Définir les attributs et le contenu des éléments
        imageProject.src = project.image;
        titleProject.textContent = project.title;

        // Ajouter les éléments à la galerie
        gallery.appendChild(galleryProject);
        galleryProject.appendChild(imageProject);
        galleryProject.appendChild(titleProject)
      };
    }


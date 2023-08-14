// Upload form

document.addEventListener('DOMContentLoaded', () => {
  
  let uploadForm = document.getElementById('submit-project');
  let gallery = document.querySelector('.gallery');
  const authToken = sessionStorage.getItem('authToken');

  uploadForm.addEventListener('click', async () => {
    let imageFileInput = document.getElementById('file-input');
    let imageUrl = imageFileInput.files[0];                           // Le fichier sélectionné est le premier élément du tableau 'files'
    let title = document.getElementById('title').value;
    let categoryId = document.getElementById('categoryId').value;

    // Validate the form data
    if (!imageUrl || !title) {
      alert('Veuillez remplir tous les champs du formulaire.');
      return; // Stop the form submission if any field is missing
    }

    // Créez un objet FormData pour envoyer les données au serveur
    let formData = new FormData();
    formData.append('image', imageUrl);
    formData.append('title', title);
    formData.append('category', categoryId);

    try {
      // Envoyez les données au serveur en utilisant 'fetch'
      let response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        body: formData, // Utilisez le FormData comme corps de la requête
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi des données.');
    }

    let data = await response.json();
    console.log('Réponse du serveur :', data);

    let event = new CustomEvent('projectAdded', { detail: data });
    document.dispatchEvent(event);

    } catch (error) {
      console.error('Erreur lors de l\'envoi des données :', error);
    }
});

    // Allow to add simultaneously a project in the homepage gallery when an add is done in the modal gallery (cf new CustomEvent line 44 45)
    document.addEventListener('projectAdded', function(event) {
      let data = event.detail;
      let newProject = createModalProject(data);
      gallery.appendChild(newProject);
    });

    function createModalProject(project) {
      let galleryProject = document.createElement('figure');
      galleryProject.classList.add('project-gallery-' + project.id);
      let imageProject = document.createElement('img');
      let titleProject = document.createElement('figcaption');

      imageProject.src = project.imageUrl;
      titleProject.textContent = project.title;

      gallery.appendChild(galleryProject);
      galleryProject.appendChild(imageProject);
      galleryProject.appendChild(titleProject);

      return galleryProject;
    }

    // Check size of the uploaded image

    let uploadLimit = document.querySelector("#uploadedImage");

    uploadLimit.onchange = function (){
        if(uploadedImage.files[0].size > 4194304) {
            alert("Fichier trop volumineux");
            uploadedImage.value = "";
        }
    };
});

// Showing img after selecting it in file-input

document.addEventListener('DOMContentLoaded', function() {

  let fileInput = document.getElementById('file-input');
  let uploadedImage = document.getElementById('uploadedImage');
  let addBtn = document.getElementById('add-photo-btn');

  fileInput.addEventListener('change', function(event) {  // On ajoute un écouteur d'événements à l'élément 'fileInput', qui réagit lorsque l'utilisateur sélectionne un fichier.
    let file = event.target.files[0];                    // On obtient le premier fichier sélectionné par l'utilisateur à partir de l'événement.
    let reader = new FileReader();                      // On crée un objet FileReader, qui permet de lire le contenu des fichiers.
    
    reader.onload = function() {                      // On définit une fonction qui sera appelée lorsque la lecture du fichier sera terminée.
      uploadedImage.src = reader.result;             // On met à jour la source de l'image 'uploadedImage' avec les données lues à partir du fichier.
      uploadedImage.style.display = 'flex';
      addBtn.style.display = 'none';
                                                   // En somme, cette partie de code met à jour l'image affichée avec le contenu du fichier sélectionné,
                                                  // affiche cette image à l'utilisateur et cache le bouton "Add photo".
    }

    if (file) {
      reader.readAsDataURL(file);             // Si un fichier a été sélectionné, on commence à lire son contenu sous forme d'URL de données.
    }
  });
});
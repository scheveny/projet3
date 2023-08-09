// Showing img after selecting it in file-input

document.addEventListener('DOMContentLoaded', function() {
  let fileInput = document.getElementById('file-input');
  let uploadedImage = document.getElementById('uploadedImage');
  let addBtn = document.getElementById('add-photo-btn');

  fileInput.addEventListener('change', function(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function() {
      uploadedImage.src = reader.result;
      uploadedImage.style.display = 'flex'; // Display the uploaded image
      addBtn.style.display = 'none'; // Hide the 'Add photo' span
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  });
});

// Upload form

document.addEventListener('DOMContentLoaded', () => {
  
  let uploadForm = document.getElementById('submit-project');
  let gallery = document.querySelector('.gallery');
  const authToken = sessionStorage.getItem('authToken');

  uploadForm.addEventListener('click', async () => {

    // Récupérez le fichier sélectionné par l'utilisateur
    let imageFileInput = document.getElementById('file-input');
    let imageUrl = imageFileInput.files[0]; // Le fichier sélectionné est le premier élément du tableau 'files'

    // Récupérez les autres données du formulaire si nécessaire
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

      let data = await response.json(); // Supposons que le serveur renvoie une réponse JSON
      console.log('Réponse du serveur :', data);

      let event = new CustomEvent('projectAdded', { detail: data });
      document.dispatchEvent(event);

      } catch (error) {
        console.error('Erreur lors de l\'envoi des données :', error);
      }
  });
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
});

// Check size of the upload image

let uploadLimit = document.querySelector("#uploadedImage");
    uploadLimit.onchange = function (){
        if(uploadedImage.files[0].size > 4194304) {
            alert("Fichier trop volumineux");
            uploadedImage.value = "";
        }
    };
let backBtn = document.querySelector('.back-btn');

  backBtn.addEventListener('click', () => {
    let modal1 = document.querySelector('.modal-wdw1');
    let modal2 = document.querySelector('.modal-wdw2');

    modal1.style.display = 'flex';
    modal2.style.display = 'none';
  });

  // Upload form

  document.getElementById("upload-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi du formulaire par défaut

    // Récupérer les valeurs du formulaire
    let title = document.getElementById("title").value;
    let categoryId = document.getElementById("categoryId").value;
    let imageInput = document.getElementById("file-input");
    let imageFile = imageInput.files[0];

    // Vérifier si le titre a été renseigné
    if (!title) {
      alert("Veuillez renseigner un titre !");
      return;
    }

    // Vérifier si une image a été sélectionnée
    if (!imageFile) {
      alert("Veuillez sélectionner une image !");
      return;
    }

    // Créer un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append("title", title);
    formData.append("categoryId", categoryId);
    formData.append("imageUrl", imageFile);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert("Le formulaire a été envoyé avec succès ! Réponse de l'API : " + JSON.stringify(data));

      // Réinitialiser le formulaire après l'ajout du projet
      document.getElementById("upload-form").reset();
    })
    .catch(error => {
      console.error("Erreur lors de l'envoi de la requête :", error);
    });
  })

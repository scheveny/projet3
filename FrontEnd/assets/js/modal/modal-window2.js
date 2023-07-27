let backBtn = document.querySelector('.back-btn');

  backBtn.addEventListener('click', () => {
    let modal1 = document.querySelector('.modal-wdw1');
    let modal2 = document.querySelector('.modal-wdw2');

    modal1.style.display = 'flex';
    modal2.style.display = 'none';
  });

  // Upload form

let uploadForm = document.getElementById('upload-form');
const authToken = sessionStorage.getItem('authToken');

uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Récupérez le fichier sélectionné par l'utilisateur
  const imageFileInput = document.getElementById('file-input');
  const imageUrl = imageFileInput.files[0]; // Le fichier sélectionné est le premier élément du tableau 'files'

  // Récupérez les autres données du formulaire si nécessaire
  const title = document.getElementById('title').value;
  const categoryId = document.getElementById('categoryId').value;

  // Créez un objet FormData pour envoyer les données au serveur
  let formData = new FormData();
  formData.append('imageURl', imageUrl);
  formData.append('title', title);
  formData.append('categoryId', categoryId);

  try {
    // Envoyez les données au serveur en utilisant 'fetch'
   console.log('before fetch');
    let response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData, // Utilisez le FormData comme corps de la requête
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi des données.');
    }

    let data = response.json(); // Supposons que le serveur renvoie une réponse JSON
    console.log('Réponse du serveur :', data);
  } catch (error) {
    // Gérez les erreurs éventuelles de la requête
    console.error('Erreur lors de l\'envoi des données :', error);
  }
});


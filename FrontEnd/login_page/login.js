document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche le rechargement de la page après la soumission du formulaire
  
    // Récupération des valeurs des champs d'entrée
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
  
    // Construction de l'objet de données à envoyer dans la requête POST
    let data = {
      email: email,
      password: password
    };
  
    try {
      // Envoi de la requête POST à l'API
      let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        // Redirection vers la page d'accueil si la connexion est confirmée
        window.location.href = 'http://127.0.0.1:5500/FrontEnd/home_page/index.html';
      } else {
        // Affichage du message d'erreur si les informations de connexion ne sont pas correctes
        let errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Les informations e-mail / mot de passe ne sont pas correctes.';
        errorMessage.style.display = 'block';
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la requête:', error);
    }
  });
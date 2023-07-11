 // Fonction pour gérer le clic sur un bouton
    function handleClick(event, categoryButtons) {
      // Supprimer la classe 'cat-btns-active' de tous les boutons de catégorie
      for (let i = 0; i < categoryButtons.length; i++) {
        categoryButtons[i].classList.remove('cat-btns-active');
        categoryButtons[i].classList.add('cat-btns-inactive');
      }
  
      // Ajouter la classe 'cat-btns-active' au bouton actuellement cliqué
      event.target.classList.remove('cat-btns-inactive');
      event.target.classList.add('cat-btns-active');
    }

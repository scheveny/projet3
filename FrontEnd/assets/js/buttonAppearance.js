let categoryButtons = document.querySelector('.cat-btns-inactive');

// Fonction pour gérer le clic sur un bouton
function handleClick(event, categoryButtons) {
// Supprimer la classe 'cat-btns-active' de tous les boutons de catégorie
  for (let i = 0; i < categoryButtons.length; i++) {
    categoryButtons[i].classList.remove('cat-btns-inactive');
  }
  
// Ajouter la classe 'cat-btns-active' au bouton actuellement cliqué
    event.target.classList.add('cat-btns-active');
}

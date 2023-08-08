document.addEventListener('DOMContentLoaded', () => {

    let editProjectLink = document.querySelector('#edit-project-modal');
    let closeModalButtons = document.querySelectorAll('.close-btn');
    let editProjectModals = document.querySelectorAll('.modal-wdws');

    function openModal(event) {
        event.preventDefault();
        editProjectModals.forEach((modal) => {
            modal.style.display = 'flex';
        });
    };

    function closeModal(event) {
        event.preventDefault();
        let modalToClose = event.target.closest('.modal-wdws');
            modalToClose.style.display = 'none';

    };

    editProjectLink.addEventListener("click", (event) => {
        openModal(event);
    });

    closeModalButtons.forEach(function (button) {
        button.addEventListener('click', closeModal);
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal-wdws')) {
            closeModal(event);
        }
    });
});

// Pathway between delete-project wdw1 and add-project wdw2

let btn = document.querySelector('.pjct-add-btn');

btn.addEventListener('click', () => {
  let modal1 = document.querySelector('.modal-wdw1');
  let modal2 = document.querySelector('.modal-wdw2');

  modal1.style.display = 'none';
  modal2.style.display = 'block';
});
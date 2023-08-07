document.addEventListener('DOMContentLoaded', () => {

    let editProjectLink = document.querySelector('#edit-project-modal');
    let closeModalButtons = document.querySelectorAll('.close-btn');
    let editProjectModals = document.querySelectorAll('.modal-wdws');

    function openModal(event) {
        event.preventDefault();
        editProjectModals.forEach((modal) => {
            modal.style.display = 'flex';
        });
        console.log('Fenêtres modales ouvertes !');
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
            console.log('Fenêtre modale fermée en cliquant en dehors !');
        }
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal(event);
        }
    });
});

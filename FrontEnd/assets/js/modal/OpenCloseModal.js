document.addEventListener('DOMContentLoaded', () => {

    let editProjectLink = document.querySelector('#edit-project-modal');
    let editProjectModal = document.querySelector('.project-modal');
    let closeModalButton = document.querySelector('.close-btn')

    function OpenModal(event) {
        event.preventDefault();
        editProjectModal.style.display = 'flex';
        console.log('Fenêtre modale ouverte !');
    };

    function closeModal (event) {
        event.preventDefault();
        editProjectModal.style.display = 'none';
        console.log('Fenêtre modale fermée !');
    };
    
    editProjectLink.addEventListener("click", (event) => {
        OpenModal(event);
    });

    closeModalButton.addEventListener('click', (event) => {
        closeModal(event);
    });

    window.addEventListener('click', (event) => {
        if (event.target === editProjectModal) {
          closeModal(event);
          console.log('Fenêtre modale fermée en cliquant en dehors !');
        }
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal(event)
        }
    })
})
/* let modal = null

let openModal = function (e) {
    e.preventDefault()
    let target = document.querySelector()
    target.style.display = null
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('js-modal-stop').addEventListener('click', stopPropagation)
}

let closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.removeEventListener('click', closeModal)
    modal.querySelector('js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

let stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
}) */

document.addEventListener('DOMContentLoaded', (event) => {
    let editProjectLink = document.querySelector('#edit-project-modal');
    let editProjectModal = document.querySelector('#project-modal');
    console.log(editProjectLink);
    function OpenModal(event) {
        event.preventDefault();
        editProjectModal.style.display = 'flex';
    }
    
    editProjectLink.addEventListener("click", (event) => {
        OpenModal(event);
      });
})

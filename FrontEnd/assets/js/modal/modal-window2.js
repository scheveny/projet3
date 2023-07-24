let backBtn = document.querySelector('.back-btn');

  backBtn.addEventListener('click', () => {
    let modal1 = document.querySelector('.modal-wdw1');
    let modal2 = document.querySelector('.modal-wdw2');

    modal1.style.display = 'flex';
    modal2.style.display = 'none';
  });
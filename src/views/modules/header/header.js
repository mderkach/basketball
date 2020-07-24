const header = {
  btns: [
    document.querySelector('.header__nav-button'),
    document.querySelector('.header__socials-button'),
  ],
  init: () => {
    if (header.btns) {
      header.btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();

          btn.classList.toggle('is-active');
        });
      });
    }
  },
};

export default header;

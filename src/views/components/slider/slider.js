import { Swiper } from 'swiper';

const slider = {
  wrapper: document.querySelectorAll('.slider-outer'),
  buildSlider: (container) => {
    const selector = `.${container.children[0].classList[1]}`;
    const sldr = new Swiper(selector, {
      loop: true,
      spaceBetween: 30,
      speed: 400,
      wrapperClass: container.children[0].children[0].classList[0],
      slideClass: container.children[0].children[0].children[0].classList[0],
      breakpoints: {
        1200: {
          slidesPerView: 4,
        },
        576: {
          slidesPerView: 2,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
      on: {
        init: () => {
          const navBtn = [container.children[1].children[1], container.children[1].children[0]];
          navBtn.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();

              if (index === 0) {
                sldr.slideNext();
              }

              if (index === 1) {
                sldr.slidePrev();
              }
            });
          });
        },
      },
    });

    return sldr;
  },
  init: () => {
    if (slider.wrapper.length) {
      slider.wrapper.forEach((container) => {
        slider.buildSlider(container);
      });
    }
  },
};

export default slider;

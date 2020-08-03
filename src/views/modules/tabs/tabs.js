import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

const tabs = {
  navBtns: document.querySelectorAll('.tabs-menu__button'),
  navAnchors: document.querySelectorAll('.tabs-menu__link'),
  navSlider: new Swiper('.tabs-menu__link_wrapper', {
    init: false,
    slidesPerView: 3,
    wrapperClass: 'tabs-menu__link_outer',
    slideClass: 'tabs-menu__link',
    speed: 400,
    navigation: {
      nextEl: document
        .querySelector('.tabs-menu__link_wrapper')
        .parentElement.querySelector('.tabs-menu__button_next'),
      prevEl: document
        .querySelector('.tabs-menu__link_wrapper')
        .parentElement.querySelector('.tabs-menu__button_prev'),
      disabledClass: 'is-disabled',
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      576: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  }),
  currentAnchor: undefined,
  tabs: document.querySelectorAll('.tabs-tab'),
  getCurrentTab: (arr) => {
    arr.forEach((item) => {
      if (item.classList.contains('is-active')) {
        tabs.currentAnchor = item;
      }
    });
  },
  setCurrentTab: (arr, sibling) => {
    arr.forEach((elm) => {
      const tab = document.querySelector(sibling.getAttribute('href'));

      if (elm === tab) {
        elm.classList.add('is-active');
      } else {
        elm.classList.remove('is-active');
      }
    });
  },
  removeActiveClass: (arr) => {
    arr.forEach((item) => {
      item.classList.remove('is-active');
    });
  },
  // prevAll: (elm) => {
  //   const result = [];
  //   let from = elm;
  //   while (from) {
  //     result.push(from);
  //     from = from.previousElementSibling;
  //   }

  //   let offset = 0;

  //   result.forEach((link, index) => {
  //     if (index !== 0) {
  //       const { width } = link.getBoundingClientRect();
  //       console.log(link.getBoundingClientRect());
  //       offset += Math.floor(width);
  //     }
  //   });

  //   tabs.navAnchors.forEach((item) => {
  //     // eslint-disable-next-line no-param-reassign
  //     item.style.transform = `translateX(${-offset - 15}px)`;
  //   });
  // },
  changeTab: () => {
    tabs.navBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // set current anchor and tab
        tabs.getCurrentTab(tabs.navAnchors);
        // remove active class on anchor
        tabs.removeActiveClass(tabs.navAnchors);
        // next & prev elements
        const next = tabs.currentAnchor.nextElementSibling || tabs.currentAnchor.nextSibling;
        const prev = tabs.currentAnchor.previousElementSibling || tabs.currentAnchor.prevSibling;
        const first = tabs.navAnchors[0];
        const last = tabs.navAnchors[tabs.navAnchors.length - 1];

        // set active next anchor
        if (btn.classList.contains('tabs-menu__button_next')) {
          if (next) {
            next.classList.add('is-active');
            tabs.setCurrentTab(tabs.tabs, next);
          } else {
            first.classList.add('is-active');
            tabs.setCurrentTab(tabs.tabs, first);
          }
        }

        // set active prev anchor
        if (btn.classList.contains('tabs-menu__button_prev')) {
          if (prev) {
            prev.classList.add('is-active');
            tabs.setCurrentTab(tabs.tabs, prev);
          } else {
            last.classList.add('is-active');
            tabs.setCurrentTab(tabs.tabs, last);
          }
        }
      });
    });
  },
  anchorClick: () => {
    tabs.navAnchors.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        tabs.currentAnchor = item;
        tabs.removeActiveClass(tabs.navAnchors);
        item.classList.add('is-active');
        tabs.setCurrentTab(tabs.tabs, item);
      });
    });
  },
  init: () => {
    tabs.getCurrentTab(tabs.navAnchors);
    tabs.setCurrentTab(tabs.tabs, tabs.currentAnchor);
    tabs.changeTab();
    tabs.anchorClick();
    tabs.navSlider.init();
  },
};

export default tabs;

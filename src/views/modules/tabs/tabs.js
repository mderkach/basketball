import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

const tabs = {
  navBtns: document.querySelectorAll('.tabs-menu__button'),
  navAnchors: document.querySelectorAll('.tabs-menu__link'),
  navSlider: () => {
    const sldr = new Swiper('.tabs-menu__link_wrapper', {
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
    });
    return sldr;
  },
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
    if (tabs.tabs.length) {
      tabs.getCurrentTab(tabs.navAnchors);
      tabs.setCurrentTab(tabs.tabs, tabs.currentAnchor);
      tabs.changeTab();
      tabs.anchorClick();
      tabs.navSlider().init();
    }
  },
};

export default tabs;

import Swiper from 'swiper';

const tabs = {
  navBtns: document.querySelectorAll('.tabs-menu__button'),
  navAnchors: document.querySelectorAll('.tabs-menu__link'),
  currentAnchor: undefined,
  tabs: document.querySelectorAll('.tabs-tab'),
  // isMobile: () => {
  //   if (window.innerWidth <= 1199) {
  //     return true;
  //   }
  //   return false;
  // },
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
      const slider = new Swiper(tab.children[1], {
        init: false,
        loop: true,
        spaceBetween: 30,
        speed: 400,
        wrapperClass: tab.children[1].children[0].classList[0],
        slideClass: tab.children[1].children[0].children[0].classList[0],
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
            const navBtn = [tab.children[2].children[1], tab.children[2].children[0]];
            navBtn.forEach((btn, index) => {
              btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (index === 0) {
                  slider.slideNext();
                }

                if (index === 1) {
                  slider.slidePrev();
                }
              });
            });
          },
        },
      });

      if (elm === tab) {
        elm.classList.add('is-active');
        slider.init();
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

        // set active next anchor
        if (btn.classList.contains('tabs-menu__button_next')) {
          if (tabs.currentAnchor.nextSibling) {
            tabs.currentAnchor.nextSibling.classList.add('is-active');
            tabs.setCurrentTab(tabs.tabs, tabs.currentAnchor.nextSibling);
          } else {
            tabs.navAnchors[0].classList.add('is-active');
            tabs.setCurrentTab(tabs.tabs, tabs.navAnchors[0]);
          }
        }

        // set active prev anchor
        if (btn.classList.contains('tabs-menu__button_prev')) {
          if (tabs.currentAnchor.previousSibling) {
            tabs.currentAnchor.previousSibling.classList.add('is-active');
            tabs.setCurrentTab(tabs.tabs, tabs.currentAnchor.previousSibling);
          } else {
            tabs.navAnchors[tabs.navAnchors.length - 1].classList.add('is-active');
            tabs.setCurrentTab(tabs.tabs, tabs.navAnchors[tabs.navAnchors.length - 1]);
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
  },
};

export default tabs;

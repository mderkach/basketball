const tabs = {
  navBtns: document.querySelectorAll('.tabs-menu__button'),
  navAnchors: document.querySelectorAll('.tabs-menu__link'),
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

/* eslint-disable import/extensions */
// JS
// eslint-disable-next-line import/no-unresolved
import './js/*';
// SCSS
import './scss/main.scss';

// CSS (example)
// import './assets/css/main.css'

// components
import paralax from './views/components/paralax/paralax';
import header from './views/modules/header/header';
import tabs from './views/modules/tabs/tabs';
import slider from './views/components/slider/slider';
import calendar from './views/modules/calendar/calendar';

// init
header.init();
paralax.init();
tabs.init();
slider.init();
calendar.init();

/* eslint-disable import/extensions */
// JS
// eslint-disable-next-line import/no-unresolved
import './js/*';
// SCSS
import './scss/main.scss';
import paralax from './views/components/paralax/paralax';
import header from './views/modules/header/header';

// CSS (example)
// import './assets/css/main.css'

// components
header.init();
paralax.init();

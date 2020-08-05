import "core-js/stable";
import "regenerator-runtime/runtime";

import '../css/reset.css';
import '../sass/header.scss';
import '../sass/footer.scss';
import '../sass/page.scss';

import { includeHTML, qs, htmlToElement } from './functions.js';

// working with <include>'s
includeHTML();

let burger = qs(".header__burger"),  //just a shortcut for document.querySelector
  menu = qs(".menu"),
  menuText = qs(".menu__text");

burger.addEventListener('click', () => {
  console.log(menu.style.transform);
  if (menu.style.transform != "scale(1)") {
    menu.style.visibility = "visible";
    menu.style.transform = "scale(1)";
    document.body.style.overflow = "hidden";
    menuText.style.opacity = "1";
    menuText.style.transitionDuration = "0";
    menuText.style.transitionDelay = "0";
    // burger.style.position = "fixed";
  } else {
    menu.style.transform = "scale(0)";
    document.body.style.overflow = "visible";
    menuText.style.opacity = "0";
    menuText.style.transitionDuration = ".5s";
    menuText.style.transitionDelay = ".5s";
    // burger.style.position = "static";
  }
})

let svg = qs("svg");

svg.addEventListener('click', () => {
  if (svg.classList.contains("cross")) {
    svg.classList.remove("cross");
  } else {
    svg.classList.add("cross");
  }
})
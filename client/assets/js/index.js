import "core-js/stable";
import "regenerator-runtime/runtime";

import Glide from "./glide.min.js";

import '../css/reset.css';
import '../sass/header.scss';
import '../sass/footer.scss';
import '../sass/index.scss';

import { includeHTML, qs, htmlToElement } from './functions.js';

// working with <include>'s
includeHTML();


// =================================

const BACKEND_URL = "http://localhost:1337";

// console.log(env.HOST);

// =================================


// glideJS
let glide = new Glide(".glide", {
  type: "carousel",
  // autoplay: 6000,
  gap: 100,
})

glide.on("run.after", () => {
  const colour = qs(".cover .glide__slide--active").dataset.colour;
  qs(".header").style.background = colour;
})

glide.mount();

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

async function renderArticles(parent, className) {
  // getting posts from api
  try {
    let res = await fetch("http://localhost:1337/articles").then(res => res.json());
    render(res, parent, className);
  }
  catch (err) {
    console.log(err);
  }

  function render(data, parent, className) {
    for (let i in data) {
      if (i >= 4) {
        break;
      }

      let date = new Date(data[i].updated_at);
      date = `${date.getHours() + 1}:${date.getMinutes() + 1}, ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`

      let element = `<div class="${className}" data-id="${data[i].id}"><div class="${className}__text"><h4 class="${className}__heading">${data[i].title}</h4><p class="${className}__date">${date}</p><p class="${className}__desc">${data[i].description}</p></div></div>`;

      element = htmlToElement(element);
      parent.appendChild(element)
    }
  }
}

renderArticles(qs(".articles"), "article")

let svg = qs("svg");

svg.addEventListener('click', () => {
  if (svg.classList.contains("cross")) {
    svg.classList.remove("cross");
  } else {
    svg.classList.add("cross");
  }
})
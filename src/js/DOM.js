const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");
const nav = document.querySelector("nav");
const main = document.querySelector("main");
const header = document.querySelector("header");
const mainComponents = [overlay, nav, main, header];

export function navBar() {
  menu.addEventListener("click", () => {
    mainComponents.forEach((comp) => {
      comp.classList.add("open");
    });
    document.body.classList.toggle("no-scroll");
  });
  overlay.addEventListener("click", () => {
    mainComponents.forEach((comp) => {
      comp.classList.remove("open");
    });
    document.body.classList.toggle("no-scroll");
  });
}
export function transitionLoad() {
  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        mainComponents.forEach((comp) => {
          comp.classList.add("transition");
        });
      });
    });
  });
}

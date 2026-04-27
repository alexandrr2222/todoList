import {
  navIndicator,
  mainComponents,
  menu,
  overlay,
} from "./DOM_components.js";

let firstSelectedTitle, initialButtons;

export function navBar() {
  firstSelectedTitle = document.querySelector(".selectedTitle");
  navIndicator.style.transform = `translateY(${firstSelectedTitle.offsetTop}px)`;
  menu.addEventListener("click", () => {
    mainComponents.forEach((comp) => {
      comp.classList.add("open");
    });
    document.body.classList.toggle("noScroll");
  });
  overlay.addEventListener("click", () => {
    mainComponents.forEach((comp) => {
      comp.classList.remove("open");
    });
    document.body.classList.toggle("noScroll");
  });
}
function moveIndicator(currentButton) {
  const btnTop = currentButton.offsetTop;
  navIndicator.style.transform = `translateY(${btnTop}px)`;
}
export function changePage() {
  initialButtons = document.querySelectorAll("nav button");
  initialButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedTitle = document.querySelector(".selectedTitle");
      moveIndicator(btn);
      selectedTitle.classList.remove("selectedTitle");
      btn.classList.add("selectedTitle");
    });
  });
}
export function changePageNewCategory(insertedCategory) {
  insertedCategory.addEventListener("click", () => {
    const selectedTitle = document.querySelector(".selectedTitle");
    moveIndicator(insertedCategory);
    selectedTitle.classList.remove("selectedTitle");
    insertedCategory.classList.add("selectedTitle");
  });
}

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
// bugger: after it moves u can scroll down in navBar
function moveIndicator(currentButton) {
  const btnTop = currentButton.offsetTop;
  navIndicator.style.transform = `translateY(${btnTop}px)`;
}
export function changePage() {
  initialButtons = document.querySelectorAll("nav button");
  initialButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentTitle = document.querySelector(".currentTitle");
      const selectedTitle = document.querySelector(".selectedTitle");
      moveIndicator(btn);
      selectedTitle.classList.remove("selectedTitle");
      btn.classList.add("selectedTitle");
      currentTitle.textContent = btn.textContent;
      showPage(btn);
    });
  });
}
export function changePageNewCategory(insertedCategory) {
  insertedCategory.addEventListener("click", () => {
    const currentTitle = document.querySelector(".currentTitle");
    const selectedTitle = document.querySelector(".selectedTitle");
    moveIndicator(insertedCategory);
    selectedTitle.classList.remove("selectedTitle");
    insertedCategory.classList.add("selectedTitle");
    currentTitle.textContent = insertedCategory.textContent;
    showPage(insertedCategory);
  });
}
function hideAllPages() {
  const allButtons = document.querySelectorAll(".section");
  allButtons.forEach((btn) => {
    btn.style.display = "none";
  });
}
function showPage(btn) {
  hideAllPages();
  const sectionContainer = document.querySelector(
    `.${btn.dataset.pageType}SectionContainer`,
  );
  sectionContainer.style.display = "block";
}

// all tasks > render every task that has completed:no
// completed > render every task that has completed:yes
// taskCategoryClass > take DOM's ID from data(or class) and then select only arrays that match that ID + completed:no

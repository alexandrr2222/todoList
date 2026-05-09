import { changePageNewCategory } from "../DOM_nav.js";
import { bookmarkSVGIcon } from "../icons.js";
import { CategoryClass } from "../models.js";
import { moveIndicator } from "../DOM_nav.js";
import exampleData from "../exampleData.json" with { type: "json" };

let nav, bookmarkInsert, colorButtons, categoryErrorField;

nav = document.querySelector("nav");
colorButtons = document.querySelectorAll(".colorButton");
bookmarkInsert = document.querySelector(".bookmarkInsert");
categoryErrorField = document.querySelector(".categoryErrorField");

export function switchColors() {
  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedColorBtn = document.querySelector(".selectedColor");
      selectedColorBtn.classList.remove("selectedColor");
      btn.classList.add("selectedColor");
    });
  });
}
export function createExampleCategories() {
  new CategoryClass("uncategorizedID", "Uncategorized", "null");
  exampleData.categories.forEach((ctg) => {
    createCategoryDOM(new CategoryClass(ctg.id, ctg.name, ctg.color));
  });
}
export function submitCategory() {
  if (document.querySelector("#categoryTitle").value.trim() === "") {
    categoryErrorField.style.display = "block";
    return false;
  }
  createCategoryDOM(createCategoryClass());
  const selectedTitle = document.querySelector(".selectedTitle");
  moveIndicator(selectedTitle);
  return true;
}
function createCategoryClass() {
  const categoryName = document.querySelector("#categoryTitle").value;
  const categoryColor = getComputedStyle(
    document.querySelector(".selectedColor"),
  ).backgroundColor;
  const categoryID = "ID" + crypto.randomUUID();
  return new CategoryClass(categoryID, categoryName, categoryColor);
}
function createCategoryDOM(categoryFromClass) {
  const newCategory = document.createElement("button");
  const newCategoryIcon = document.createElement("span");
  newCategory.dataset.dataID = categoryFromClass.id;
  newCategory.textContent = categoryFromClass.name;
  newCategory.dataset.pageType = "task";
  newCategory.classList.add("categoryItem");
  newCategoryIcon.classList.add("bookmarkSVG");
  newCategoryIcon.style.color = categoryFromClass.color;
  newCategoryIcon.innerHTML = bookmarkSVGIcon;
  newCategory.prepend(newCategoryIcon);
  nav.insertBefore(newCategory, bookmarkInsert);
  changePageNewCategory(newCategory);
}

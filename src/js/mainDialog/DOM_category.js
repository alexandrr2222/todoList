import { changePageNewCategory } from "../DOM_nav.js";
import { bookmarkSVGIcon } from "../icons.js";
import { CategoryClass } from "../models.js";
import { moveIndicator } from "../DOM_nav.js";
import exampleData from "../exampleData.json" with { type: "json" };
import { enforceCategoryNaming } from "../DOM_settings.js";

let dividerLine, colorButtons, categoryErrorField;

colorButtons = document.querySelectorAll(".colorButton");
dividerLine = document.querySelector(".bookmarkInsert");
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
  new CategoryClass("uncategorizedID", "Uncategorized", "grey");
  exampleData.categories.forEach((ctg) => {
    createCategoryDOM(new CategoryClass(ctg.id, ctg.name, ctg.color));
  });
}
function checkCategoryNaming() {
  const enforceNamingBtn = document.querySelector("#enforceNaming");
  if (enforceNamingBtn.classList.contains("on")) return true;
}
export function submitCategory() {
  if (document.querySelector("#categoryTitle").value.trim() === "") {
    categoryErrorField.style.display = "block";
    return false;
  }
  createCategoryDOM(createCategoryClass());
  const selectedTitle = document.querySelector(".selectedTitle");
  moveIndicator(selectedTitle);
  if (checkCategoryNaming()) enforceCategoryNaming();
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
  const html = `
    <button class="categoryItem" data-data-i-d="${categoryFromClass.id}" data-page-type="task">
      <span class="bookmarkSVG" style="color: ${categoryFromClass.color};">${bookmarkSVGIcon}</span>
      <span class="categoryName"> ${categoryFromClass.name} </span>
    </button>
  `;
  dividerLine.insertAdjacentHTML("beforebegin", html);
  const newCategory = dividerLine.previousElementSibling;
  changePageNewCategory(newCategory);
}

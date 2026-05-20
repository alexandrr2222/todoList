import { changePageNewCategory } from "../DOM_nav.js";
import { bookmarkSVGIcon, expandButtonSVGIcon } from "../icons.js";
import { CategoryClass, TaskClass } from "../models.js";
import { moveIndicator } from "../DOM_nav.js";
import exampleData from "../exampleData.json" with { type: "json" };
import { enforceCategoryNaming } from "../DOM_settings.js";
import { routeEdit } from "../DOM_main.js";

const confirmDialogItem = document.querySelector(".confirmDialogItem");
const confirmYesItem = document.querySelector(".confirmYesItem");
const confirmNoItem = document.querySelector(".confirmNoItem");
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
    <li class="categoryItem navButton" data-data-i-d="${categoryFromClass.id}" data-page-type="task">
      <div class="mainCategory">
        <span class="bookmarkSVG" style="color: ${categoryFromClass.color};">${bookmarkSVGIcon}</span>
        <span class="categoryName"> ${categoryFromClass.name} </span>
        <button class="categoryOptions" aria-label="See category options">
                ${expandButtonSVGIcon}
        </button>
      </div>
      <div class="expandCategory">
          <button class="categoryEditBtn">Edit</button>
          <button class="categoryDeleteBtn">Delete</button>
      </div>
    </li>
  `;
  dividerLine.insertAdjacentHTML("beforebegin", html);
  const newCategory = document.querySelector(
    `[data-data-i-d="${categoryFromClass.id}"]`,
  );

  addEditListener(newCategory, categoryFromClass, CategoryClass.all);
  addDeleteListener(newCategory, categoryFromClass, CategoryClass.all);
  changePageNewCategory(newCategory);
}
function addEditListener(category, selectedClass, classArray) {
  const editButton = category.querySelector(".categoryEditBtn");

  editButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const index = classArray.indexOf(selectedClass);
    routeEdit(index, classArray);
  });
}

function addDeleteListener(category, selectedClass, classArray) {
  const deleteButton = category.querySelector(".categoryDeleteBtn");
  deleteButton.addEventListener("click", (e) => {
    const confirmDialogItemText = document.querySelector(
      ".confirmDialogItemText",
    );
    confirmDialogItemText.textContent =
      "Delete this category and all its tasks?";
    e.stopPropagation();
    useConfirmationDialogItem(() =>
      deleteCategory(category, selectedClass, classArray),
    );
  });
}
function deleteCategory(category, selectedClass, classArray) {
  const index = classArray.indexOf(selectedClass);
  const previousCategory = category.previousElementSibling;
  previousCategory.click();
  const selectedTasks = TaskClass.all.filter(
    (task) => task.inCategory === category.dataset.dataID,
  );
  selectedTasks.forEach((task) => {
    const taskIndex = TaskClass.all.indexOf(task);
    TaskClass.all.splice(taskIndex, 1);
  });

  classArray.splice(index, 1);
  category.remove();
}

function useConfirmationDialogItem(callback) {
  confirmDialogItem.showModal();
  confirmYesItem.onclick = (e) => {
    e.stopPropagation();
    callback();
    confirmDialogItem.close();
  };
  confirmNoItem.onclick = (e) => {
    e.stopPropagation();
    const openCategory = document.querySelector(".categoryItem.open");
    openCategory.querySelector(".categoryOptions svg").classList.toggle("spin");
    openCategory.classList.remove("open");
    confirmDialogItem.close();
  };
}

// enforce capital first letter on edit

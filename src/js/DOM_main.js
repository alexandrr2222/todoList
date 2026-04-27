import { bookmarkSVGIcon } from "./icons.js";
import { changePageNewCategory } from "./DOM_nav.js";
import { TaskClass, NoteClass, CategoryClass } from "./models.js";
let addButton,
  addDialogBtn,
  closeDialogBtn,
  optionButtons,
  colorButtons,
  addForm,
  nav,
  bookmarkInsert,
  categoryErrorField;

export function dialogMaster() {
  addButton = document.querySelector(".add");
  addDialogBtn = document.querySelector(".addDialog");
  closeDialogBtn = document.querySelector(".closeDialog");
  optionButtons = document.querySelectorAll(".optionButton");
  colorButtons = document.querySelectorAll(".colorButton");
  addForm = document.querySelector(".addForm");
  nav = document.querySelector("nav");
  bookmarkInsert = document.querySelector(".bookmarkInsert");
  categoryErrorField = document.querySelector(".categoryErrorField");
  openDialog();
  closeDialog();
  switchDialogOptions();
  switchColors();
  submit();
}
function openDialog() {
  addButton.addEventListener("click", () => {
    addDialogBtn.showModal();
  });
}
function closeDialog() {
  closeDialogBtn.addEventListener("click", () => {
    addDialogBtn.close();
  });
}
function switchDialogOptions() {
  optionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const activeButton = document.querySelector(".activeButton");
      activeButton.classList.remove("activeButton");
      btn.classList.add("activeButton");
    });
  });
}
function routeOptions() {
  const activeButton = document.querySelector(".activeButton");
  if (activeButton.classList.contains("taskButton")) {
    console.log("toBeDone");
  } else if (activeButton.classList.contains("noteButton")) {
    console.log("toBeDone");
  } else if (activeButton.classList.contains("categoryButton")) {
    if (!submitCategory()) return false;
    categoryErrorField.style.visibility = "hidden";
  }
  return true;
}
function submit() {
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!routeOptions()) return;
    addDialogBtn.close();
    addForm.reset();
  });
}

function switchColors() {
  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedColorBtn = document.querySelector(".selectedColor");
      selectedColorBtn.classList.remove("selectedColor");
      btn.classList.add("selectedColor");
    });
  });
}
function submitCategory() {
  if (document.querySelector("#categoryTitle").value.trim() === "") {
    categoryErrorField.style.visibility = "visible";
    return false;
  }
  createCategoryDOM(createCategoryClass());
  return true;
}
function createCategoryClass() {
  const categoryName = document.querySelector("#categoryTitle").value;
  const categoryColor = getComputedStyle(
    document.querySelector(".selectedColor"),
  ).backgroundColor;
  const categoryID = crypto.randomUUID();
  return new CategoryClass(categoryID, categoryName, categoryColor);
}
function createCategoryDOM(categoryFromClass) {
  const newCategory = document.createElement("button");
  const newCategoryIcon = document.createElement("span");
  newCategory.classList.add(categoryFromClass.id);
  newCategory.textContent = categoryFromClass.name;
  newCategoryIcon.classList.add("bookmarkSVG");
  newCategoryIcon.style.color = categoryFromClass.color;
  newCategoryIcon.innerHTML = bookmarkSVGIcon;
  newCategory.prepend(newCategoryIcon);
  nav.insertBefore(newCategory, bookmarkInsert);
  changePageNewCategory(newCategory);
}

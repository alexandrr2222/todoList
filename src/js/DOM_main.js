import { bookmarkSVGIcon, closeSVGIcon } from "./icons.js";
import { changePageNewCategory } from "./DOM_nav.js";
import { NoteClass, CategoryClass } from "./models.js";
// TaskClass,
let addButton,
  addDialogBtn,
  closeDialogBtn,
  optionButtons,
  colorButtons,
  addForm,
  nav,
  bookmarkInsert,
  categoryErrorField,
  categoryContent,
  taskContent,
  noteErrorField,
  noteContent,
  noteSection,
  contextMenu,
  deleteCont;

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
  categoryContent = document.querySelector(".categoryContent");
  taskContent = document.querySelector(".taskContent");
  noteContent = document.querySelector(".noteContent");
  noteErrorField = document.querySelector(".noteErrorField");
  noteSection = document.querySelector(".notesSectionSubcontainer");
  contextMenu = document.querySelector(".contextMenu");
  deleteCont = document.querySelector(".deleteCont");
  openDialog();
  closeDialog();
  switchDialogOptions();
  switchColors();
  submit();
  closeContextMenu();
  deleteItem();
}
function openDialog() {
  addButton.addEventListener("click", () => {
    addDialogBtn.showModal();
  });
}
function closeDialog() {
  // more cleanups
  closeDialogBtn.addEventListener("click", () => {
    addDialogBtn.close();
  });
}
function helpDisplayOptions(visible, hidden1, hidden2) {
  visible.style.display = "block";
  hidden1.style.display = "none";
  hidden2.style.display = "none";
}
function switchDialogOptions() {
  optionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const activeButton = document.querySelector(".activeButton");
      activeButton.classList.remove("activeButton");
      btn.classList.add("activeButton");
      if (btn.classList.contains("taskButton")) {
        helpDisplayOptions(taskContent, categoryContent, noteContent);
      } else if (btn.classList.contains("noteButton")) {
        helpDisplayOptions(noteContent, taskContent, categoryContent);
      } else if (btn.classList.contains("categoryButton")) {
        helpDisplayOptions(categoryContent, noteContent, taskContent);
      }
    });
  });
}
function routeOptions() {
  const activeButton = document.querySelector(".activeButton");
  if (activeButton.classList.contains("taskButton")) {
    console.log("toBeDone");
  } else if (activeButton.classList.contains("noteButton")) {
    if (!submitNote()) return false;
    noteErrorField.style.display = "none";
  } else if (activeButton.classList.contains("categoryButton")) {
    if (!submitCategory()) return false;
    categoryErrorField.style.display = "none";
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
function addContextMenuControls(container) {
  let pressTimer;
  container.addEventListener("touchstart", () => {
    pressTimer = setTimeout(() => {
      showContextMenu(container);
    }, 500);
  });
  container.addEventListener("touchend", () => {
    clearTimeout(pressTimer);
  });
  container.addEventListener("touchmove", () => {
    clearTimeout(pressTimer);
  });
}
function closeContextMenu() {
  // spamming on every click
  document.addEventListener("click", () => {
    contextMenu.style.display = "none";
  });
}
function showContextMenu(item) {
  const itemPosition = item.getBoundingClientRect();
  contextMenu.style.display = "flex";
  contextMenu.style.top = `calc(${itemPosition.bottom}px - 1rem)`;
  contextMenu.style.left = itemPosition.left + "px";
  deleteCont.dataset.currentItem = item.dataset.dataID;
}
function deleteItem() {
  deleteCont.addEventListener("click", () => {
    const id = deleteCont.dataset.currentItem;
    const index = NoteClass.all.findIndex((ind) => ind.id === id);
    NoteClass.all.splice(index, 1);
    const DOMToDelete = document.querySelector(`[data-data-i-d="${id}"]`);
    DOMToDelete.remove();
  });
}
function submitNote() {
  if (
    document.querySelector("#noteTitle").value.trim() === "" &&
    document.querySelector("#noteDescription").value.trim() === ""
  ) {
    noteErrorField.style.display = "block";
    return false;
  }
  createNoteDOM(createNoteClass());
  return true;
}
function createNoteClass() {
  const noteTitle = document.querySelector("#noteTitle").value.trim();
  const noteDescription = document
    .querySelector("#noteDescription")
    .value.trim();
  const noteID = "ID" + crypto.randomUUID();
  return new NoteClass(noteID, noteTitle, noteDescription);
}

function createNoteDOM(noteFromClass) {
  console.log(noteFromClass.title);
  const newNote = document.createElement("div");
  const closeNote = document.createElement("buttom");
  closeNote.classList.add("closeSVG");
  closeNote.innerHTML = closeSVGIcon;

  newNote.classList.add("noteItem");
  newNote.dataset.dataID = noteFromClass.id;
  newNote.textContent = noteFromClass.description;
  if (noteFromClass.title.trim() !== "") {
    const headerNote = document.createElement("h2");
    headerNote.textContent = noteFromClass.title;
    headerNote.classList.add("noteItemTitle");
    newNote.prepend(headerNote);
    if (noteFromClass.description.trim() === "")
      headerNote.style.marginBottom = "0rem";
  }
  newNote.prepend(closeNote);
  noteSection.append(newNote);
  addContextMenuControls(newNote);
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
    categoryErrorField.style.display = "block";
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
  const categoryID = "ID" + crypto.randomUUID();
  return new CategoryClass(categoryID, categoryName, categoryColor);
}
function createCategoryDOM(categoryFromClass) {
  const newCategory = document.createElement("button");
  const newCategoryIcon = document.createElement("span");
  newCategory.dataset.dataID = categoryFromClass.id;
  newCategory.textContent = categoryFromClass.name;
  newCategory.dataset.pageType = "task";
  newCategoryIcon.classList.add("bookmarkSVG");
  newCategoryIcon.style.color = categoryFromClass.color;
  newCategoryIcon.innerHTML = bookmarkSVGIcon;
  newCategory.prepend(newCategoryIcon);
  nav.insertBefore(newCategory, bookmarkInsert);
  changePageNewCategory(newCategory);
}

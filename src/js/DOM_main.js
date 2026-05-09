import { switchColors, submitCategory } from "./mainDialog/DOM_category.js";
import { submitNote } from "./mainDialog/DOM_note.js";
import { switchPrio, submitTask, taskInit } from "./mainDialog/DOM_task.js";

import { NoteClass, CategoryClass, TaskClass } from "./models.js";
let isEditMode = false;

let addButton,
  addDialogBtn,
  closeDialogBtn,
  optionButtons,
  addForm,
  categoryErrorField,
  categoryContent,
  taskContent,
  noteErrorField,
  noteContent,
  contextMenu,
  editCont,
  deleteCont,
  newOptions,
  submitButton,
  dialogTitle,
  taskButton,
  noteTitle,
  noteDescription,
  categoryTitle,
  redColor,
  taskBelong,
  taskErrorField,
  taskTitle,
  taskDueDate,
  taskDesc;

export function dialogMaster() {
  addButton = document.querySelector(".add");
  addDialogBtn = document.querySelector(".addDialog");
  closeDialogBtn = document.querySelector(".closeDialog");
  optionButtons = document.querySelectorAll(".optionButton");
  submitButton = document.querySelector(".submitButton");
  dialogTitle = document.querySelector(".dialogTitle");
  taskButton = document.querySelector(".taskButton");
  noteTitle = document.querySelector("#noteTitle");
  noteDescription = document.querySelector("#noteDescription");
  categoryTitle = document.querySelector("#categoryTitle");
  redColor = document.querySelector(".redColor");
  addForm = document.querySelector(".addForm");
  taskBelong = document.querySelector("#taskBelong");
  taskErrorField = document.querySelector(".taskErrorField");
  taskTitle = document.querySelector("#taskTitle");
  taskDueDate = document.querySelector("#taskDate");
  taskDesc = document.querySelector("#taskDescription");

  categoryErrorField = document.querySelector(".categoryErrorField");
  categoryContent = document.querySelector(".categoryContent");
  taskContent = document.querySelector(".taskContent");
  noteContent = document.querySelector(".noteContent");
  noteErrorField = document.querySelector(".noteErrorField");

  contextMenu = document.querySelector(".contextMenu");
  deleteCont = document.querySelector(".deleteCont");
  editCont = document.querySelector(".editCont");
  newOptions = document.querySelector(".newOptions");
  openDialog();
  closeDialog();
  switchDialogOptions();
  switchColors();
  submit();
  switchPrio();
  taskInit();
  closeContextMenu();
  deleteItem();
  editItem();
}
function resetNoteDialog() {
  noteErrorField.style.display = "none";
  noteTitle.value = "";
  noteDescription.value = "";
}
function resetCategoryDialog() {
  categoryErrorField.style.display = "none";
  categoryTitle.value = "";
  const selectedColor = document.querySelector(".selectedColor");
  selectedColor.classList.remove("selectedColor");
  redColor.classList.add("selectedColor");
}

function resetTaskDialog() {
  taskErrorField.style.display = "none";
  taskTitle.value = "";
  taskDueDate.value = "";
  taskDesc.value = "";
}
function resetDialog() {
  helpDisplayOptions(taskContent, noteContent, categoryContent);
  newOptions.style.display = "block";
  submitButton.textContent = "Add";
  dialogTitle.textContent = "Add New";
  isEditMode = false;
  resetNoteDialog();
  resetCategoryDialog();
  resetTaskDialog();
  // questionable, should be settings
  const activeButton = document.querySelector(".activeButton");
  activeButton.classList.remove("activeButton");
  taskButton.classList.add("activeButton");
}
function populateCategorySelection() {
  taskBelong.querySelectorAll("option").forEach((opt) => {
    opt.remove();
  });
  CategoryClass.all.forEach((ctg) => {
    const selectionOption = document.createElement("option");
    selectionOption.value = ctg.id;
    selectionOption.textContent = ctg.name;
    taskBelong.append(selectionOption);
  });
}
function openDialog() {
  addButton.addEventListener("click", () => {
    populateCategorySelection();
    resetDialog();
    addDialogBtn.showModal();
  });
}
function closeDialog() {
  closeDialogBtn.addEventListener("click", () => {
    resetDialog();
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
    if (!submitTask()) return false;
    taskErrorField.style.display = "none";
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
    if (isEditMode) {
      let { interactiveItem, chosenClass, index } = interactItem(editCont);
      editSubmission(interactiveItem, chosenClass, index);
    } else {
      if (!routeOptions()) return;
    }
    addDialogBtn.close();
    addForm.reset();
  });
}
export function addContextMenuControls(container) {
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
  editCont.dataset.currentItem = item.dataset.dataID;
}
function interactItem(container) {
  const id = container.dataset.currentItem;
  let chosenClass;
  //   replace if with loop
  if (NoteClass.all.find((ind) => ind.id === id)) {
    chosenClass = NoteClass.all;
  } else if (TaskClass.all.find((ind) => ind.id === id)) {
    chosenClass = TaskClass.all;
  } else if (CategoryClass.all.find((ind) => ind.id === id)) {
    chosenClass = CategoryClass.all;
  }
  const interactiveItem = document.querySelector(`[data-data-i-d="${id}"]`);
  const index = chosenClass.findIndex((ind) => ind.id === id);
  return { interactiveItem, index, chosenClass };
}
function deleteItem() {
  deleteCont.addEventListener("click", () => {
    let { interactiveItem, index, chosenClass } = interactItem(deleteCont);
    chosenClass.splice(index, 1);
    interactiveItem.remove();
  });
}
function editItem() {
  editCont.addEventListener("click", () => {
    isEditMode = true;
    let { index, chosenClass } = interactItem(editCont);
    newOptions.style.display = "none";
    submitButton.textContent = "Edit";
    if (chosenClass === TaskClass.all) {
      dialogTitle.textContent = "Edit Task";
      helpDisplayOptions(taskContent, noteContent, categoryContent);
    } else if (chosenClass === NoteClass.all) {
      dialogTitle.textContent = "Edit Note";
      noteDescription.value = chosenClass[index].description;
      noteTitle.value = chosenClass[index].title;
      helpDisplayOptions(noteContent, taskContent, categoryContent);
    } else if (chosenClass === CategoryClass.all) {
      dialogTitle.textContent = "Edit Category";
      categoryTitle.value = chosenClass[index].name;
      helpDisplayOptions(categoryContent, noteContent, taskContent);
    }
    addDialogBtn.showModal();
  });
}
function editSubmission(interactiveItem, chosenClass, index) {
  if (interactiveItem.classList.contains("noteItem")) {
    const noteTitle = document.querySelector("#noteTitle").value.trim();
    const noteDescription = document
      .querySelector("#noteDescription")
      .value.trim();
    interactiveItem.querySelector("h2").textContent = noteTitle;
    interactiveItem.querySelector("p").textContent = noteDescription;
    chosenClass[index].title = noteTitle;
    chosenClass[index].description = noteDescription;
  } else if (interactiveItem.classList.contains("categoryItem")) {
    console.log("k");
  }
}

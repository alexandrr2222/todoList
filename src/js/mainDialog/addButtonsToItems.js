import { TaskClass, CategoryClass } from "../models.js";
import { routeEdit, populateCategorySelection } from "../DOM_main.js";
import { showPage } from "../DOM_nav.js";

const confirmDialogItem = document.querySelector(".confirmDialogItem");
const confirmYesItem = document.querySelector(".confirmYesItem");
const confirmNoItem = document.querySelector(".confirmNoItem");

export function addEditListener(category, selectedClass, classArray) {
  let editButton;
  if (classArray === CategoryClass.all) {
    populateCategorySelection();
    editButton = category.querySelector(".categoryEditBtn");
  } else if (classArray === TaskClass.all)
    editButton = category.querySelector(".taskEdit");

  editButton.addEventListener("click", (e) => {
    if (selectedClass.dueDate)
      document.querySelector(".dateCont").classList.add("hasValue");
    e.stopPropagation();
    const index = classArray.findIndex((item) => item.id === selectedClass.id);
    routeEdit(index, classArray);
  });
}

export function addDeleteListener(category, selectedClass, classArray) {
  let deleteButton;
  if (classArray === CategoryClass.all)
    deleteButton = category.querySelector(".categoryDeleteBtn");
  else if (classArray === TaskClass.all)
    deleteButton = category.querySelector(".taskDelete");
  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const confirmDialogItemText = document.querySelector(
      ".confirmDialogItemText",
    );
    if (classArray === CategoryClass.all) {
      confirmDialogItemText.textContent =
        "Delete this category and all its tasks?";
      useConfirmationDialogItem(() =>
        deleteCategory(category, selectedClass, classArray),
      );
    } else if (classArray === TaskClass.all) {
      confirmDialogItemText.textContent = "Delete this task?";
      useConfirmationDialogItem(() => deleteTask(selectedClass, classArray));
    }
  });
}
function deleteTask(selectedClass, classArray) {
  const index = classArray.indexOf(selectedClass);
  classArray.splice(index, 1);
  const selectedTitle = document.querySelector(".selectedTitle");
  showPage(selectedTitle);
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
    if (openCategory) {
      openCategory
        .querySelector(".categoryOptions svg")
        .classList.toggle("spin");
      openCategory.classList.remove("open");
    }
    confirmDialogItem.close();
  };
}

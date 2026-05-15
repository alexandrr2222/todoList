import { CategoryClass, TaskClass, NoteClass } from "./models.js";
import { moveIndicator } from "./DOM_nav.js";
import { createExampleTasks } from "./mainDialog/DOM_task.js";
import { createExampleNotes } from "./mainDialog/DOM_note.js";
import { createExampleCategories } from "./mainDialog/DOM_category.js";
const swatches = document.querySelectorAll(".swatch");
const lowPrio = document.querySelector(".lowPrio");
const midPrio = document.querySelector(".midPrio");
const highPrio = document.querySelector(".highPrio");
const UNCATEGORIZED_COUNT = 1;
const taskSectionContainer = document.querySelector(".taskSectionContainer");
const notesSectionSubcontainer = document.querySelector(
  ".notesSectionSubcontainer",
);
const dataReset = document.querySelector(".dataReset");
const settings = document.querySelector(".settings");
const dataRestore = document.querySelector(".dataRestore");
const enforceNamingBtn = document.querySelector("#enforceNaming");
const showCompletedBtn = document.querySelector("#showCompleted");
const confirmDialog = document.querySelector(".confirmDialog");
const confirmYes = document.querySelector(".confirmYes");
const confirmNo = document.querySelector(".confirmNo");

export function initSettings() {
  initSelectAccent();
  initShowCompletedTasks();
  initCategoryNaming();
  initDeleteAllData();
  initRestoreExamples();
  initCancelConfirmation();
}
function initSelectAccent() {
  swatches.forEach((btn) => {
    btn.addEventListener("click", () => {
      const active = document.querySelector(".swatch.active");
      active.classList.remove("active");
      btn.classList.add("active");
      const categoryColor = getComputedStyle(btn).backgroundColor;
      document.documentElement.style.setProperty(
        "--primaryAccent",
        categoryColor,
      );
    });
  });
}
function selectDefaultPriorityHelper(
  selectedPrio,
  unselectedPrio1,
  unselectedPrio2,
) {
  selectedPrio.classList.add("selectedPrio");
  selectedPrio.setAttribute("aria-checked", "true");
  unselectedPrio1.setAttribute("aria-checked", "false");
  unselectedPrio2.setAttribute("aria-checked", "false");
}
export function selectDefaultPriority() {
  const selectedPrio = document.querySelector(".selectedPrio");
  selectedPrio.classList.remove("selectedPrio");
  const settingSelectValue = document.querySelector(".settingSelect").value;
  if (settingSelectValue === "low")
    selectDefaultPriorityHelper(lowPrio, midPrio, highPrio);
  else if (settingSelectValue === "medium")
    selectDefaultPriorityHelper(midPrio, lowPrio, highPrio);
  else if (settingSelectValue === "high")
    selectDefaultPriorityHelper(highPrio, lowPrio, midPrio);
}
function initShowCompletedTasks() {
  showCompletedBtn.addEventListener("click", () => {
    showCompletedBtn.classList.toggle("on");
  });
}

export function adjustCompletedTasks(taskList) {
  if (!showCompletedBtn.classList.contains("on")) {
    return taskList.filter((task) => task.completion === false);
  } else return taskList;
}

export function enforceCategoryNaming() {
  const categoryNames = document.querySelectorAll(".categoryName");
  categoryNames.forEach((category) => {
    const text = category.textContent.trim();
    category.textContent =
      text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  });
}

function removeCategoryNaming() {
  CategoryClass.all.forEach((category) => {
    const categoryName = document.querySelector(
      `[data-data-i-d="${category.id}"] .categoryName`,
    );
    categoryName.textContent = category.name;
  });
}

function initCategoryNaming() {
  enforceNamingBtn.addEventListener("click", () => {
    enforceNamingBtn.classList.toggle("on");
    if (enforceNamingBtn.classList.contains("on")) enforceCategoryNaming();
    else removeCategoryNaming();
  });
}

function deleteAllData() {
  NoteClass.all.splice(0);
  TaskClass.all.splice(0);
  CategoryClass.all.splice(UNCATEGORIZED_COUNT);
  taskSectionContainer.innerHTML = "";
  notesSectionSubcontainer.innerHTML = "";
  const allCategories = document.querySelectorAll(".categoryItem");
  allCategories.forEach((category) => {
    category.remove();
  });
}
function useConfirmationDialog(callback) {
  confirmDialog.showModal();
  confirmYes.onclick = () => {
    callback();
    moveIndicator(settings);
    confirmDialog.close();
  };
}

export function initDeleteAllData() {
  dataReset.addEventListener("click", () => {
    useConfirmationDialog(() => {
      deleteAllData();
    });
  });
}
export function initCancelConfirmation() {
  confirmNo.addEventListener("click", () => {
    confirmDialog.close();
  });
}

export function initRestoreExamples() {
  dataRestore.addEventListener("click", () => {
    useConfirmationDialog(() => {
      deleteAllData();
      createExampleTasks();
      createExampleNotes();
      createExampleCategories();
    });
  });
}

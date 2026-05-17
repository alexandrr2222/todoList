import {
  navIndicator,
  mainComponents,
  menu,
  overlay,
} from "./DOM_components.js";
import { updateStatOverview, updateStatProgress } from "./DOM_statistics.js";

import { removeTasksFromDom, loadTasks } from "./mainDialog/DOM_task.js";
import { TaskClass, NoteClass } from "./models.js";
import { adjustCompletedTasks } from "./DOM_settings.js";
import {
  resetSearchbar,
  sortByNewest,
  restartSortMenu,
  buildContent,
  disableInvalidSortersForNotes,
  restoreSorters,
} from "./DOM_header.js";
import { createNoteDOM } from "./mainDialog/DOM_note.js";

let firstSelectedTitle, initialButtons;
const rightHeader = document.querySelector(".rightHeader");
const addButton = document.querySelector(".add");
const notesSectionSubcontainer = document.querySelector(
  ".notesSectionSubcontainer",
);

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
// bug: after it moves u can scroll down in navBar
export function moveIndicator(currentButton) {
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
function hideRightHeaderAndPlusButton() {
  rightHeader.classList.add("hidden");
  addButton.classList.add("hidden");
}
function openRightHeaderAndPlusButton() {
  rightHeader.classList.remove("hidden");
  addButton.classList.remove("hidden");
}
function showPage(btn) {
  hideAllPages();
  resetSearchbar();
  restartSortMenu();
  restoreSorters();
  const sectionContainer = document.querySelector(
    `.${btn.dataset.pageType}SectionContainer`,
  );
  sectionContainer.style.display = "block";
  if (btn.dataset.pageType === "settings") {
    hideRightHeaderAndPlusButton();
  } else if (btn.dataset.pageType === "notes") {
    disableInvalidSortersForNotes();
    openRightHeaderAndPlusButton();
    buildContent(
      sortByNewest(NoteClass.all),
      notesSectionSubcontainer,
      createNoteDOM,
    );
  } else if (btn.dataset.pageType === "statistics") {
    hideRightHeaderAndPlusButton();
    updateStatOverview();
    updateStatProgress();
  } else if (btn.dataset.pageType === "task") {
    openRightHeaderAndPlusButton();
    if (btn.dataset.dataID === "allTasksID") {
      removeTasksFromDom();
      loadTasks(adjustCompletedTasks(sortByNewest(TaskClass.all)));
    } else if (btn.dataset.dataID === "completedID") {
      const completedOnly = TaskClass.all.filter(
        (task) => task.completion === true,
      );
      removeTasksFromDom();
      loadTasks(sortByNewest(completedOnly));

      // delete everything dom (if not on same page already)
    } else {
      const localID = btn.dataset.dataID;
      const matchingCategory = TaskClass.all.filter(
        (task) => task.inCategory === localID,
      );
      removeTasksFromDom();
      loadTasks(adjustCompletedTasks(sortByNewest(matchingCategory)));

      // delete everything dom (if not on same page already)
    }
  }
}

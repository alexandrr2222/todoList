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
  routePageType,
} from "./DOM_header.js";
import { createNoteDOM } from "./mainDialog/DOM_note.js";

let firstSelectedTitle, initialButtons;
const rightHeader = document.querySelector(".rightHeader");
const addButton = document.querySelector(".add");
const notesSectionSubcontainer = document.querySelector(
  ".notesSectionSubcontainer",
);

// functional edit category

export function initNav() {
  closeCategoryOptions();
}
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
// refactor slop indicator code
export function moveIndicator(currentButton) {
  const wasOpen = document.querySelector(".categoryItem.open");
  let categoryHeight;
  const selTitle = document.querySelector(".selectedTitle");
  // if (currentButton === selTitle) return;
  if (selTitle.compareDocumentPosition(currentButton) & 2) {
    const btnTop = currentButton.offsetTop;
    navIndicator.style.transform = `translateY(${btnTop}px)`;
    return;
  }
  if (wasOpen) {
    categoryHeight = wasOpen.getBoundingClientRect().height;
    const indicatorHeight = navIndicator.getBoundingClientRect().height;
    const expandedFieldHeight = categoryHeight - indicatorHeight;
    const btnTop = currentButton.offsetTop - expandedFieldHeight;
    navIndicator.style.transform = `translateY(${btnTop}px)`;
  } else {
    const btnTop = currentButton.offsetTop;
    navIndicator.style.transform = `translateY(${btnTop}px)`;
  }
}
function addCategoryOptions(categoryDOM) {
  categoryDOM.addEventListener("click", () => {
    if (categoryDOM.classList.contains("firstClick")) {
      categoryDOM.classList.toggle("open");
      categoryDOM
        .querySelector(".categoryOptions svg")
        .classList.toggle("spin");
    }
    if (!categoryDOM.classList.contains("firstClick")) {
      const allFirstClicks = document.querySelectorAll(".firstClick");
      if (allFirstClicks.length > 0) {
        allFirstClicks.forEach((fc) => {
          fc.classList.remove("firstClick");
        });
      }
      categoryDOM.classList.add("firstClick");
    }
  });
}
function closeCategoryOptions() {
  document.addEventListener("click", (e) => {
    if (
      e.target.closest("dialog") &&
      !e.target.closest(".closeDialog") &&
      !e.target.closest(".submitButton")
    )
      return;
    if (
      document.querySelector(".firstClick") &&
      !e.target.closest(".firstClick") &&
      e.target.closest(".navButton")
    ) {
      const firstClick = document.querySelector(".firstClick");
      firstClick.classList.remove("firstClick");
    }
    if (
      !e.target.closest(".categoryItem.open") &&
      document.querySelector(".categoryItem.open")
    ) {
      const openCategory = document.querySelector(".categoryItem.open");
      openCategory.classList.remove("open");
      openCategory
        .querySelector(".categoryOptions svg")
        .classList.remove("spin");
    }
  });
}
export function changePage() {
  initialButtons = document.querySelectorAll(".navButton");
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
  addCategoryOptions(insertedCategory);
  insertedCategory.addEventListener("click", () => {
    const currentTitle = document.querySelector(".currentTitle");
    const selectedTitle = document.querySelector(".selectedTitle");
    const currentCategoryName = insertedCategory.querySelector(".categoryName");
    moveIndicator(insertedCategory);
    selectedTitle.classList.remove("selectedTitle");
    insertedCategory.classList.add("selectedTitle");
    currentTitle.textContent = currentCategoryName.textContent;
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
export function showPage(btn) {
  hideAllPages();
  resetSearchbar();
  // restartSortMenu();
  restoreSorters();
  const sectionContainer = document.querySelector(
    `.${btn.dataset.pageType}SectionContainer`,
  );
  sectionContainer.style.display = "block";
  const selectedSorter = document.querySelector(".sortMenu li button.selected");
  if (btn.dataset.pageType === "settings") {
    hideRightHeaderAndPlusButton();
  } else if (btn.dataset.pageType === "notes") {
    restartSortMenu();
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
      loadTasks(adjustCompletedTasks(TaskClass.all));
      routePageType(selectedSorter);
    } else if (btn.dataset.dataID === "completedID") {
      const completedOnly = TaskClass.all.filter(
        (task) => task.completion === true,
      );
      removeTasksFromDom();
      loadTasks(completedOnly);
      routePageType(selectedSorter);
    } else {
      const localID = btn.dataset.dataID;
      const matchingCategory = TaskClass.all.filter(
        (task) => task.inCategory === localID,
      );
      removeTasksFromDom();
      loadTasks(adjustCompletedTasks(matchingCategory));
      routePageType(selectedSorter);
    }
  }
}

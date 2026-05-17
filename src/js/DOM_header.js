import { NoteClass, TaskClass } from "./models.js";
import { createNoteDOM } from "./mainDialog/DOM_note.js";
import { createTaskDOM } from "./mainDialog/DOM_task.js";
const searchIcon = document.querySelector(".search");
const searchbar = document.querySelector(".searchbar");
const notesSectionSubcontainer = document.querySelector(
  ".notesSectionSubcontainer",
);
const taskSectionContainer = document.querySelector(".taskSectionContainer");
const sortMenu = document.querySelector(".sortMenu");
const threeDots = document.querySelector(".threeDots");
const currentTitle = document.querySelector(".currentTitle");
const sortButtons = document.querySelectorAll(".sortMenu li button");
const priorityOrder = {
  low: 1,
  mid: 2,
  high: 3,
};

const sortDueDate = document.querySelector(".sortDueDate");
const sortPriorityLH = document.querySelector(".sortPriorityLH");
const sortPriorityHL = document.querySelector(".sortPriorityHL");
const NoteInvalidSorters = [sortDueDate, sortPriorityLH, sortPriorityHL];

export function initHeader() {
  initOpenSearchbar();
  initSearchbar();
  initOpenSortMenu();
  initHideSortMenu();
  initSwitchSorters();
}
export function disableInvalidSortersForNotes() {
  NoteInvalidSorters.forEach((sorter) => {
    sorter.classList.add("hidden");
  });
}
export function restoreSorters() {
  NoteInvalidSorters.forEach((sorter) => {
    sorter.classList.remove("hidden");
  });
}

export function restartSortMenu() {
  const selectedButton = document.querySelector(".sortMenu li button.selected");
  selectedButton.classList.remove("selected");
  const sortNewest = document.querySelector(".sortNewest");
  sortNewest.classList.add("selected");
}
function initOpenSortMenu() {
  threeDots.addEventListener("click", () => {
    resetSearchbar();
    sortMenu.classList.toggle("open");
  });
}
function initHideSortMenu() {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".sortMenu") && !e.target.closest(".threeDots")) {
      sortMenu.classList.remove("open");
    }
  });
}
function initSwitchSorters() {
  sortButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedButton = document.querySelector(
        ".sortMenu li button.selected",
      );
      selectedButton.classList.remove("selected");
      btn.classList.add("selected");
      routePageType(btn);
    });
  });
}

function routeSorters(classArray, selectedSorter) {
  const sortMap = {
    sortByNewest,
    sortByOldest,
    sortByTitleAZ,
    sortByTitleZA,
    sortByDueDate,
    sortByPriorityLH,
    sortByPriorityHL,
  };
  const sortType = selectedSorter.dataset.sort;
  return sortMap[sortType](classArray);
}

function routePageType(selectedSorter) {
  const pageType = document.querySelector(".selectedTitle").dataset.pageType;
  if (pageType === "notes") {
    const sortedArray = routeSorters(NoteClass.all, selectedSorter);
    buildContent(sortedArray, notesSectionSubcontainer, createNoteDOM);
  } else if (pageType === "task") {
    const currentTasks = selectCurrentTasks();
    const sortedArray = routeSorters(currentTasks, selectedSorter);
    buildContent(sortedArray, taskSectionContainer, createTaskDOM);
  }
}
export function sortByNewest(classArray) {
  return [...classArray].reverse();
}
function sortByOldest(classArray) {
  return [...classArray];
}
function sortByTitleAZ(classArray) {
  const withTitle = classArray.filter((item) => item.title);
  const withoutTitle = classArray.filter((item) => !item.title);
  const sortedTitles = [...withTitle].sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  return [...sortedTitles, ...withoutTitle];
}
function sortByTitleZA(classArray) {
  const withTitle = classArray.filter((item) => item.title);
  const withoutTitle = classArray.filter((item) => !item.title);
  const sortedTitles = [...withTitle].sort((a, b) =>
    b.title.localeCompare(a.title),
  );
  return [...sortedTitles, ...withoutTitle];
}
function sortByDueDate(classArray) {
  const withDate = classArray.filter((item) => item.dueDate);
  const withoutDate = classArray.filter((item) => !item.dueDate);
  const sortedDates = [...withDate].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate),
  );
  return [...sortedDates, ...withoutDate];
}
function sortByPriorityLH(classArray) {
  return [...classArray].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
  );
}
function sortByPriorityHL(classArray) {
  return [...classArray].sort(
    (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority],
  );
}
// search part (Separate later)

export function resetSearchbar() {
  searchbar.value = "";
  searchbar.classList.remove("expanded");
  currentTitle.classList.remove("hidden");
  //   searchbar.dispatchEvent(new Event("input"));
  const selectedButton = document.querySelector(".sortMenu li button.selected");
  selectedButton.click();
}

function initOpenSearchbar() {
  searchIcon.addEventListener("click", () => {
    currentTitle.classList.toggle("hidden");
    searchbar.classList.toggle("expanded");
    if (searchbar.classList.contains("expanded")) {
      searchbar.focus();
    }
    if (!searchbar.classList.contains("expanded")) resetSearchbar();
  });
}
function initSearchbar() {
  searchbar.addEventListener("input", (e) => {
    const searchValue = e.target.value;
    const pageType = document.querySelector(".selectedTitle").dataset.pageType;
    if (pageType === "notes") {
      const filteredItems = filterByValue(NoteClass.all, searchValue);
      buildContent(filteredItems, notesSectionSubcontainer, createNoteDOM);
    } else if (pageType === "task") {
      const currentTasks = selectCurrentTasks();
      const filteredItems = filterByValue(currentTasks, searchValue);
      buildContent(filteredItems, taskSectionContainer, createTaskDOM);
    }
  });
}
function selectCurrentTasks() {
  const categoryType = document.querySelector(".selectedTitle").dataset.dataID;
  if (categoryType === "allTasksID") return TaskClass.all;
  else if (categoryType === "completedID")
    return TaskClass.all.filter((task) => task.completion === true);
  else return TaskClass.all.filter((task) => task.inCategory === categoryType);
}
function filterByValue(items, searchValue) {
  const query = searchValue.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query),
  );
}
export function buildContent(filteredItems, container, createDOM) {
  container.innerHTML = "";
  filteredItems.forEach((item) => {
    createDOM(item);
  });
}

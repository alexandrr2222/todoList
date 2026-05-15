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
const sortNewest = document.querySelector(".sortNewest");
const sortButtons = document.querySelectorAll(".sortMenu li button");

export function initHeader() {
  initOpenSearchbar();
  initSearchbar();
  initOpenSortMenu();
  initSwitchSorters();
}

function initOpenSortMenu() {
  threeDots.addEventListener("click", () => {
    sortMenu.classList.toggle("open");
  });
}
function initSwitchSorters() {
  sortButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedButton = document.querySelector(
        "sortMenu li button.selected",
      );
      selectedButton.classList.remove("selected");
      btn.classList.add("selected");
    });
  });
}
export function sortByNewest() {
  sortNewest.addEventListener("click", () => {
    const pageType = document.querySelector(".selectedTitle").dataset.pageType;
    if (pageType === "notes") {
      const reversedNotes = [...NoteClass.all].reverse();
      buildFilteredContent(
        reversedNotes,
        notesSectionSubcontainer,
        createNoteDOM,
      );
    } else if (pageType === "task") {
      //   const currentTasks = selectCurrentTasks();
      //   const filteredItems = filterByValue(currentTasks, searchValue);
      //   buildFilteredContent(filteredItems, taskSectionContainer, createTaskDOM);
    }
  });
}

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

export function resetSearchbar() {
  searchbar.value = "";
  searchbar.classList.remove("expanded");
  currentTitle.classList.remove("hidden");
  searchbar.dispatchEvent(new Event("input"));
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
      buildFilteredContent(
        filteredItems,
        notesSectionSubcontainer,
        createNoteDOM,
      );
    } else if (pageType === "task") {
      const currentTasks = selectCurrentTasks();
      const filteredItems = filterByValue(currentTasks, searchValue);
      buildFilteredContent(filteredItems, taskSectionContainer, createTaskDOM);
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
function buildFilteredContent(filteredItems, container, createDOM) {
  container.innerHTML = "";
  filteredItems.forEach((item) => {
    createDOM(item);
  });
}

import "../css/reset.css";
import "../css/global.css";
import "../css/main.css";
import "../css/components/header.css";
import "../css/components/nav.css";
import "../css/components/mainDialog/category.css";
import "../css/components/mainDialog/note.css";
import "../css/components/mainDialog/task.css";
import "../css/components/todoItem.css";
import "../css/components/statistics.css";
import "../css/components/settings.css";
import { initIcons } from "./iconInjections.js";
import { navBar, changePage, initNav } from "./DOM_nav.js";
import { transitionLoad } from "./DOM_global.js";
import { dialogMaster } from "./DOM_main.js";
import { TaskClass, NoteClass, CategoryClass } from "./models.js";
import { createExampleCategories } from "./mainDialog/DOM_category.js";
import { createExampleNotes } from "./mainDialog/DOM_note.js";
import { createExampleTasks } from "./mainDialog/DOM_task.js";
import { initSettings } from "./DOM_settings.js";
import { initHeader } from "./DOM_header.js";
// for debugging
window.TaskClass = TaskClass;
window.NoteClass = NoteClass;
window.CategoryClass = CategoryClass;

handleResize();
initIcons();
navBar();
initNav();
transitionLoad();
initHeader();
initSettings();
changePage();
dialogMaster();
createExampleCategories();
createExampleNotes();
createExampleTasks();

// last
const allTasksButton = document.querySelector(".allTasks");
allTasksButton.click();

function handleResize() {
  let resizeTimer;
  const noteItemsInit = document.querySelectorAll(".noteItem");
  noteItemsInit.forEach((item) => {
    if (window.innerWidth > 1024) {
      item.contentEditable = "true";
      item.spellcheck = false;
    } else {
      item.contentEditable = "false";
      item.spellcheck = true;
    }
  });
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const noteItems = document.querySelectorAll(".noteItem");

      noteItems.forEach((item) => {
        if (window.innerWidth > 1024) {
          item.contentEditable = "true";
          item.spellcheck = false;
        } else {
          item.contentEditable = "false";
          item.spellcheck = true;
        }
      });
    }, 200);
  });
}

// task addons - progress, subtask

// JS

// get rid of dom component and instead do queries with let

// CSS
// add amount of uncompleted tasks in each section
// features to use: starting style
// anchor positioning for next project

// BUG: editing on pc window doesn't change texts in class

// ############################################
// IMPORTANT
// tasks:
// 6. push finished to bottom in all but completed category

// add local storage
// ###############################################

// nav less relevant:
// content resets position when opening nav
// eclipse/limit too long categories

// habits improve for next: comments and commits

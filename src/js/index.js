import "../css/reset.css";
import "../css/global.css";
import "../css/main.css";
import "../css/components/header.css";
import "../css/components/nav.css";
import "../css/components/mainDialog/category.css";
import "../css/components/mainDialog/note.css";
import "../css/components/mainDialog/task.css";
import { initIcons } from "./iconInjections.js";
import { navBar, changePage } from "./DOM_nav.js";
import { transitionLoad } from "./DOM_global.js";
import { dialogMaster } from "./DOM_main.js";
import { TaskClass, NoteClass, CategoryClass } from "./models.js";

// for debugging
window.TaskClass = TaskClass;
window.NoteClass = NoteClass;
window.CategoryClass = CategoryClass;

handleResize();
initIcons();
navBar();
transitionLoad();
changePage();
dialogMaster();

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

// High Prio:create mockup todoItem(class),
// if task > title, note, due date, priority (progress, subtask) = add task
// Low Prio: add amount of uncompleted tasks in each section, sort by priority or anything else rly

// settings > enforce style (always capitalize start)

// get rid of dom component and instead do queries with let

// add category editor

import "../css/reset.css";
import "../css/global.css";
import "../css/main.css";
import "../css/components/header.css";
import "../css/components/nav.css";
import { initIcons } from "./iconInjections.js";
import { navBar, changePage } from "./DOM_nav.js";
import { transitionLoad } from "./DOM_global.js";
import { dialogMaster } from "./DOM_main.js";
import { TaskClass, NoteClass, CategoryClass } from "./models.js";

// for debugging
window.TaskClass = TaskClass;
window.NoteClass = NoteClass;
window.CategoryClass = CategoryClass;

initIcons();
navBar();
transitionLoad();
changePage();
dialogMaster();
// High Prio:create mockup todoItem(class),
// if note > title, note = add note
// if task > title, note, due date, priority (progress, subtask) = add task
// Low Prio: add amount of uncompleted tasks in each section

// settings > enforce style (always capitalize start)

// get rid of dom component and instead do queries with let

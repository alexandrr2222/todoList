import { TaskClass } from "../models.js";
import { addGlobalEventListener } from "../DOM_helper.js";
import { dateIcon, expandButtonSVGIcon } from "../icons.js";
import exampleData from "../exampleData.json" with { type: "json" };
import { format } from "date-fns";
import { addEditListener, addDeleteListener } from "./addButtonsToItems.js";
import { showPage } from "../DOM_nav.js";
import { saveProgress } from "../storage.js";

const prioButtons = document.querySelectorAll(".prioButton");
const taskErrorField = document.querySelector(".taskErrorField");
const taskSectionContainer = document.querySelector(".taskSectionContainer");

export function createExampleTasks() {
  exampleData.tasks.forEach((task) => {
    createTaskDOM(
      new TaskClass(
        task.id,
        task.title,
        task.dueDate,
        task.priority,
        task.inCategory,
        task.description,
        task.completion,
      ),
    );
  });
}
export function removeTasksFromDom() {
  taskSectionContainer.innerHTML = "";
}
export function loadTasks(tasklist) {
  tasklist.forEach((task) => {
    createTaskDOM(task);
  });
}

export function taskInit() {
  addGlobalEventListener(
    "click",
    ".taskItemOptions",
    (btn) => {
      btn
        .closest(".taskItem")
        .querySelector(".taskExpandCont")
        .classList.toggle("open");
      btn.classList.toggle("spin");
    },
    taskSectionContainer,
  );
  addGlobalEventListener(
    "click",
    ".checkboxSVG",
    (btn) => {
      const currentID = btn.closest(".taskItem").dataset.dataID;
      const currentTask = TaskClass.all.find((item) => item.id === currentID);
      currentTask.completion = !currentTask.completion;
    },
    taskSectionContainer,
  );
}
export function switchPrio() {
  prioButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedPrioBtn = document.querySelector(".selectedPrio");
      selectedPrioBtn.classList.remove("selectedPrio");
      btn.classList.add("selectedPrio");
    });
  });
}
export function submitTask() {
  if (document.querySelector("#taskTitle").value.trim() === "") {
    taskErrorField.style.display = "block";
    return false;
  }
  createTaskDOM(createTaskClass());
  return true;
}
function createTaskClass() {
  const taskID = "ID" + crypto.randomUUID();
  const taskTitle = document.querySelector("#taskTitle").value.trim();
  const taskDueDate = document.querySelector("#taskDate").value;
  const taskPrio = document.querySelector(".selectedPrio").dataset.prio;
  const taskInCategory = document.querySelector("#taskBelong").value;
  const taskDesc = document.querySelector("#taskDescription").value.trim();
  const completion = false;

  return new TaskClass(
    taskID,
    taskTitle,
    taskDueDate,
    taskPrio,
    taskInCategory,
    taskDesc,
    completion,
  );
}

export function createTaskDOM(taskFromClass) {
  let formattedDate = "";
  let dateIconInsertion = "";
  let warning = "";

  if (taskFromClass.dueDate) {
    formattedDate = format(new Date(taskFromClass.dueDate), "MMM do, H:mm");
    dateIconInsertion = dateIcon;
  }
  if (
    !taskFromClass.completion &&
    taskFromClass.dueDate &&
    new Date(taskFromClass.dueDate) < new Date()
  ) {
    warning = "!";
  }
  taskSectionContainer.insertAdjacentHTML(
    "beforeend",
    `<li class="taskItem" data-data-i-d="${taskFromClass.id}">
    <div class="priorityIndicator ${taskFromClass.priority}Prio"></div>
    <div class="taskStatic">
      <label class="taskItemCheckbox">
        <input type="checkbox" class="checkboxInput sr-only" />
        <span class="checkboxFill">✓</span>
      </label>
      <div class="taskItemContent">
        <h3 class="taskItemTitle ${taskFromClass.completion}Title">${taskFromClass.title}</h3>
        <div class="taskItemDate ">
          <span class="dateSVG">${dateIconInsertion}</span>
          <time datetime="${taskFromClass.dueDate}" >${formattedDate} </time>
          <span class="dateWarning" >${warning}</span>
        </div>
      </div>
      <button class="taskItemOptions" aria-label="Expand task details and options">${expandButtonSVGIcon}</button>
    </div>
    <div class="taskExpandCont">
            <p class="taskDesc">
              ${taskFromClass.description}
            </p>
            <div class="taskExpandButtonCont">
              <button class="taskEdit">Edit</button>
              <button class="taskDelete">Delete</button>
            </div>
    </div>
  </li>`,
  );
  const currentTask = document.querySelector(
    `[data-data-i-d="${taskFromClass.id}"]`,
  );
  if (taskFromClass.completion) {
    const checkboxInput = currentTask.querySelector(".checkboxInput");
    const checkboxCont = currentTask.querySelector(".taskItemCheckbox");
    checkboxInput.checked = true;
    checkboxCont.classList.add("checked");
    checkboxCont.classList.add(`${taskFromClass.priority}Prio`);
  }
  addEditListener(currentTask, taskFromClass, TaskClass.all);
  addDeleteListener(currentTask, taskFromClass, TaskClass.all);
  addCheckboxListener(currentTask, taskFromClass);
}

function addCheckboxListener(currentTask, taskFromClass) {
  const checkboxInput = currentTask.querySelector(".checkboxInput");
  const selectedTitle = document.querySelector(".selectedTitle");

  checkboxInput.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("hi");
    if (taskFromClass.completion) {
      taskFromClass.completion = false;
      checkboxInput.checked = false;
    } else {
      taskFromClass.completion = true;
      checkboxInput.checked = true;
    }

    showPage(selectedTitle);
    saveProgress();
  });
}

import { TaskClass } from "../models.js";
import { addGlobalEventListener } from "../DOM_helper.js";
import { dateIcon, checkboxIcon } from "../icons.js";
import exampleData from "../exampleData.json" with { type: "json" };
// import exampleData from "../exampleData.json" with { type: "json" };

const prioButtons = document.querySelectorAll(".prioButton");
const taskErrorField = document.querySelector(".taskErrorField");
const taskSectionContainer = document.querySelector(".taskSectionContainer");

// BUG: on creation of task in wrong category still creates DOM
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
  // const taskPrio = getComputedStyle(
  //   document.querySelector(".selectedPrio"),
  // ).backgroundColor;
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
  taskSectionContainer.insertAdjacentHTML(
    "beforeend",
    `<li class="taskItem" data-data-i-d="${taskFromClass.id}">
    <div class="priorityIndicator ${taskFromClass.priority}Prio"></div>
    <div class="taskStatic">
      <label class="taskItemCheckbox">
        <input type="checkbox" class="sr-only checkboxInput" />
        <span class="checkboxSVG">${checkboxIcon}</span>
      </label>
      <div class="taskItemContent">
        <h3 class="taskItemTitle">${taskFromClass.title}</h3>
        <div class="taskItemDate">
          <span class="dateSVG">${dateIcon}</span>
          <time datetime="${taskFromClass.dueDate}">${taskFromClass.dueDate}</time>
        </div>
      </div>
      <button class="taskItemOptions" aria-label="Expand task details">▾</button>
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
  if (taskFromClass.completion) {
    const currentT = document.querySelector(
      `[data-data-i-d="${taskFromClass.id}"]`,
    );
    currentT.querySelector(".checkboxInput").checked = true;
  }
}

import { TaskClass, NoteClass, CategoryClass } from "./models.js";

const totalTasksStat = document.querySelector(".totalTasksStat");
const overdueStat = document.querySelector(".overdueStat");
const totalNotesStat = document.querySelector(".totalNotesStat");
const categoriesStat = document.querySelector(".categoriesStat");
const statProgress = document.querySelector(".statProgress");
const UNCATEGORIZED_COUNT = 1;

export function updateStatOverview() {
  totalTasksStat.textContent = TaskClass.all.length;
  totalNotesStat.textContent = NoteClass.all.length;
  categoriesStat.textContent = CategoryClass.all.length - UNCATEGORIZED_COUNT;
  overdueStat.textContent = getOverdueTasks().length;
}

export function updateStatProgress() {
  statProgress.innerHTML = "";
  createProgressBar(TaskClass.all, "All Tasks", "#973f3b");
  CategoryClass.all.forEach((category) => {
    const filteredTasks = TaskClass.all.filter(
      (task) => task.inCategory === category.id,
    );
    createProgressBar(filteredTasks, category.name, category.color);
  });
}

function getOverdueTasks() {
  const currentDate = new Date();
  return TaskClass.all.filter(
    (task) =>
      !task.completion && task.dueDate && new Date(task.dueDate) < currentDate,
  );
}

function createProgressBar(tasks, barName, color) {
  const taskCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completion).length;
  const finishedPercentage =
    taskCount === 0
      ? 0
      : Number(((100 / taskCount) * completedCount).toFixed(2));
  statProgress.insertAdjacentHTML(
    "beforeend",
    `<li class="progressItem">
            <span>${barName}</span>
            <div
              class="progressBar"
              role="progressbar"
              aria-valuenow="${finishedPercentage}"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div class="progressBarFill" style="width: ${finishedPercentage}%; background-color: ${color};"></div>
            </div>
            <span>${completedCount + "/" + taskCount}</span>
          </li>`,
  );
}

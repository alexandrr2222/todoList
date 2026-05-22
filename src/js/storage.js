import { CategoryClass, NoteClass, TaskClass } from "./models.js";
import { createCategoryDOM } from "./mainDialog/DOM_category.js";
import { enforceCategoryNaming } from "./DOM_settings.js";

export function saveProgress() {
  localStorage.setItem("tasks", JSON.stringify(TaskClass.all));
  localStorage.setItem("categories", JSON.stringify(CategoryClass.all));
  localStorage.setItem("notes", JSON.stringify(NoteClass.all));
}
export function loadProgress() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const categories = JSON.parse(localStorage.getItem("categories"));
  const notes = JSON.parse(localStorage.getItem("notes"));
  if (tasks) {
    tasks.forEach((task) => {
      new TaskClass(
        task.id,
        task.title,
        task.dueDate,
        task.priority,
        task.inCategory,
        task.description,
        task.completion,
      );
    });
  }
  if (categories) {
    categories.forEach((category) => {
      new CategoryClass(category.id, category.name, category.color);
    });
    categories.forEach((category) => {
      if (category.id !== "uncategorizedID") createCategoryDOM(category);
    });
  }
  if (notes) {
    notes.forEach((note) => {
      new NoteClass(note.id, note.title, note.description);
    });
  }
}
export function saveSettings() {
  const settings = {
    colorAccent: document.querySelector(".swatch.active").dataset.color,
    defaultPriority: document.querySelector("#defaultPriority").value,
    showCompleted: document.querySelector("#showCompleted.on"),
    enforceNaming: document.querySelector("#enforceNaming.on"),
  };
  localStorage.setItem("settings", JSON.stringify(settings));
}
export function loadSettings() {
  const settings = JSON.parse(localStorage.getItem("settings"));
  if (!settings) return;
  if (settings.defaultPriority)
    document.querySelector("#defaultPriority").value = settings.defaultPriority;
  if (!settings.showCompleted)
    document.querySelector("#showCompleted").classList.remove("on");
  if (!settings.enforceNaming)
    document.querySelector("#enforceNaming").classList.remove("on");
  else enforceCategoryNaming();

  const targetColor = document.querySelector(
    `[data-color="${settings.colorAccent}"]`,
  );
  targetColor.click();
}

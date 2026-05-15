import { closeSVGIcon } from "../icons.js";
import { NoteClass } from "../models.js";
import { addContextMenuControls } from "../DOM_main.js";
import exampleData from "../exampleData.json" with { type: "json" };

let noteSection, noteErrorField;

noteSection = document.querySelector(".notesSectionSubcontainer");
noteErrorField = document.querySelector(".noteErrorField");

export function createExampleNotes() {
  exampleData.notes.forEach((note) => {
    createNoteDOM(new NoteClass(note.id, note.title, note.description));
  });
}

export function submitNote() {
  if (
    document.querySelector("#noteTitle").value.trim() === "" &&
    document.querySelector("#noteDescription").value.trim() === ""
  ) {
    noteErrorField.style.display = "block";
    return false;
  }
  createNoteDOM(createNoteClass());
  return true;
}
function createNoteClass() {
  const noteTitle = document.querySelector("#noteTitle").value.trim();
  const noteDescription = document
    .querySelector("#noteDescription")
    .value.trim();
  const noteID = "ID" + crypto.randomUUID();
  return new NoteClass(noteID, noteTitle, noteDescription);
}

export function createNoteDOM(noteFromClass) {
  const newNote = document.createElement("div");
  const newNoteText = document.createElement("p");
  const closeNote = document.createElement("button");
  closeNote.classList.add("closeSVG");
  closeNote.innerHTML = closeSVGIcon;
  closeNote.addEventListener("click", () => {
    newNote.remove();
    NoteClass.all = NoteClass.all.filter((item) => item !== noteFromClass);
  });
  newNote.classList.add("noteItem");
  newNote.dataset.dataID = noteFromClass.id;
  newNoteText.textContent = noteFromClass.description;
  newNote.prepend(newNoteText);
  const headerNote = document.createElement("h2");
  headerNote.textContent = noteFromClass.title;
  headerNote.classList.add("noteItemTitle");
  newNote.prepend(headerNote);
  newNote.prepend(closeNote);
  noteSection.append(newNote);
  addContextMenuControls(newNote);
}

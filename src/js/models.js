export class TaskClass {
  static all = [];
  constructor({
    id,
    title,
    dueDate = null,
    priority = "low",
    inCategory = null,
    description = null,
  }) {
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.inCategory = inCategory;
    this.description = description;
    TaskClass.all.push(this);
  }
}
export class NoteClass {
  static all = [];
  constructor({ id, title, description = null }) {
    this.id = id;
    this.title = title;
    this.description = description;
    NoteClass.all.push(this);
  }
}
export class CategoryClass {
  static all = [];
  constructor(id, name, color) {
    this.id = id;
    this.name = name;
    this.color = color;
    CategoryClass.all.push(this);
  }
}

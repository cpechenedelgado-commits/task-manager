import { renderTasks, clearInput } from "./ui.js";
import { getTasksFromStorage, saveTasksToStorage } from "./storage.js";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const filters = document.querySelector(".filters");
const taskList = document.getElementById("task-list");

let tasks = [];
let currentFilter = "all";

/* ======================
   INIT
====================== */
document.addEventListener("DOMContentLoaded", () => {
  tasks = getTasksFromStorage();
  applyFilter();
});

/* ======================
   ADD TASK
====================== */
form.addEventListener("submit", e => {
  e.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  addTask(title);
  clearInput(input);
  input.focus();
});

/* ======================
   TASK ACTIONS
====================== */
taskList.addEventListener("click", e => {
  const action = e.target.dataset.action;
  if (!action) return;

  const taskElement = e.target.closest(".task");
  if (!taskElement) return;

  const taskId = Number(taskElement.dataset.id);

  if (action === "delete") {
    const confirmDelete = confirm("¿Eliminar esta tarea?");
    if (!confirmDelete) return;
    deleteTask(taskId);
  }

  if (action === "toggle") {
    toggleTask(taskId);
  }

  if (action === "edit") {
    const task = tasks.find(t => t.id === taskId);
    const newTitle = prompt("Editar tarea", task.title);

    if (newTitle && newTitle.trim()) {
      editTask(taskId, newTitle.trim());
    }
  }
});

/* ======================
   FILTERS
====================== */
filters.addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;

  document
    .querySelectorAll(".filters button")
    .forEach(btn => btn.classList.remove("active"));

  e.target.classList.add("active");
  currentFilter = e.target.dataset.filter;

  applyFilter();
});

/* ======================
   CORE LOGIC
====================== */
function addTask(title) {
  tasks.push({
    id: Date.now(),
    title,
    completed: false
  });

  saveAndRender();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveAndRender();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );

  saveAndRender();
}

function editTask(id, newTitle) {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, title: newTitle }
      : task
  );

  saveAndRender();
}

/* ======================
   HELPERS
====================== */
function applyFilter() {
  let filteredTasks = tasks;

  if (currentFilter === "pending") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  renderTasks(filteredTasks);
}

function saveAndRender() {
  saveTasksToStorage(tasks);
  applyFilter();
}


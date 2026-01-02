const taskList = document.getElementById("task-list");
const counter = document.getElementById("task-counter");

export function renderTasks(tasks) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<li>No hay tareas</li>";
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;
    li.dataset.id = task.id;

    li.innerHTML = `
      <span>${task.title}</span>
      <div>
        <button data-action="toggle">✔</button>
        <button data-action="edit">✏️</button>
        <button data-action="delete">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateCounter(tasks);
}

function updateCounter(tasks) {
  const completed = tasks.filter(t => t.completed).length;
  counter.textContent = `${completed} / ${tasks.length} tareas completadas`;
}

export function clearInput(input) {
  input.value = "";
}


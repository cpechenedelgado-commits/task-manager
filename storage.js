const STORAGE_KEY = "tasks";

export function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveTasksToStorage(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// My Tasks Basic

// HTML Elements
let goBtnEl = document.getElementById("go-btn");
let menuEl = document.getElementById("menu");
let tasksEl = document.getElementById("tasks");

// Global Variables
let tasks = loadTasks();
displayAll();

// Go Btn - Menu Listener
goBtnEl.addEventListener("click", goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === "add") {
    addTask();
  } else if (selection === "toggle") {
    toggleTask();
  } else if (selection === "remove") {
    removeTask();
  } else if (selection === "clear") {
    clearAll();
  }
}

// MENU FUNCTIONS
function addTask() {
  let description = prompt("Enter task description:");
  tasks.push(newTask(description));
  saveTasks();
  displayAll();
}

// Toggle completetd status of a task
function toggleTask() {
  let index = prompt("Enter # of task:");
  let task = tasks[index];
  if (task.completed === "") {
    task.completed = "completed";
  } else {
    task.completed = "";
  }
  saveTasks();
  displayAll();
}

// Remove a task by index
function removeTask() {
  let index = +prompt("Enter # of task:");
  if (index >= 0 && index < tasks.length) {
    // Valid Index -> remove
    tasks.splice(index, 1);
    saveTasks();
    displayAll();
  } else {
    alert("Invalid Task #");
  }
}
// clear all tasks
function clearAll() {
  tasks = [];
  saveTasks();
  displayAll();
}

// Helper functions
// Return a new taskk object
function newTask(taskDescription) {
  return {
    description: taskDescription,
    completed: "",
  };
}
// Display all task in global tasks array
function displayAll() {
  let outputStr = "";
  for (let i = 0; i < tasks.length; i++) {
    outputStr += getTaskHTMLStr(tasks[i], i);
  }
  tasksEl.innerHTML = outputStr;
}

// get thml for given task
function getTaskHTMLStr(task, i) {
  return ` <div class="${task.completed}" >
  ${i}: ${task.description}
  </div>`;
}

// save globall tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// load tasks from local storage
function loadTasks() {
  let taskStr = localStorage.getItem("tasks");
  return JSON.parse(taskStr) ?? [];
}

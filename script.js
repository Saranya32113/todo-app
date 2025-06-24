window.onload = function () {
  loadTasks();
  document.getElementById("addBtn")?.addEventListener("click", addTask);
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const deadlineInput = document.getElementById("deadlineInput");

  const taskText = taskInput.value.trim();
  const deadline = deadlineInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  createTaskElement(taskText, deadline);
  saveTask(taskText, deadline);

  taskInput.value = "";
  deadlineInput.value = "";
}

function createTaskElement(taskText, deadline) {
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");

  li.textContent = `${taskText} (Due: ${deadline || "No deadline"})`;

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  li.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    li.remove();
    removeTask(taskText, deadline);
  });

  taskList.appendChild(li);

  // 🔔 Reminder setup
  if (deadline) {
    const deadlineTime = new Date(deadline).getTime();
    const now = new Date().getTime();
    const timeUntilDeadline = deadlineTime - now;

    if (timeUntilDeadline > 0) {
      setTimeout(() => {
        alert(`⏰ Reminder: "${taskText}" is due now!`);
      }, timeUntilDeadline);
    }
  }
}

function saveTask(taskText, deadline) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, deadline: deadline });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.deadline));
}

function removeTask(taskText, deadline) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => !(task.text === taskText && task.deadline === deadline));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAllTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
  }
}


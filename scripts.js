// script.js

document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Display tasks on load
  tasks.forEach((task) => addTaskToDOM(task));

  // Add task button click event
  addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText === "") return; // Do nothing if input is empty

    const task = { text: taskText, completed: false };
    tasks.push(task);
    addTaskToDOM(task);
    saveTasks();
    taskInput.value = ""; // Clear input field
  });

  // Add task to DOM
  function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button class="complete-btn">✔️</button>
          <button class="delete-btn">❌</button>
        </div>
      `;

    if (task.completed) {
      li.classList.add("completed");
    }

    // Mark as complete event
    li.querySelector(".complete-btn").addEventListener("click", function () {
      task.completed = !task.completed;
      if (task.completed) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }
      saveTasks();
    });

    // Delete task event
    li.querySelector(".delete-btn").addEventListener("click", function () {
      tasks = tasks.filter((t) => t.text !== task.text); // Remove task from array
      li.remove(); // Remove from DOM
      saveTasks();
    });

    taskList.appendChild(li);
  }

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

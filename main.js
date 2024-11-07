//to do: line between task and done tasks

const taskStatus = document.getElementById("task-status");

// Arrays to store task data
let items = [];
let dates = [];
let showTime = false;
let times = [];
let showDoneItems = false;
let doneItems = [];
let doneDates = [];
let doneTimes = [];

// Function to render tasks
function drawTasks() {
  const containerItem = document.getElementById("to-do-items");
  containerItem.innerHTML = ""; // Clear the container for new items

  // Add the header for tasks
  const header = document.createElement("p");
  header.id = "task-header";
  header.textContent = "Tasks:";
  containerItem.appendChild(header);

  // Sync checkbox state for showing time with 'showTime' variable
  const showTimeInput = document.getElementById("show-time");
  if (showTime) showTimeInput.checked = true;

  // Sync checkbox state for showing completed tasks with 'showDoneItems' variable
  const showDoneItemsInput = document.getElementById("show-done");
  showDoneItemsInput.checked = showDoneItems;

  // Display a message if there are no active tasks
  if (items.length === 0) {
    const noTasksMessage = document.createElement("p");
    noTasksMessage.id = "no-tasks";
    noTasksMessage.textContent = "No tasks to be shown..";
    containerItem.appendChild(noTasksMessage);
  }

  // Render each active task
  for (const [index, item] of items.entries()) {
    const newItem = document.createElement("div");
    newItem.classList.add("to-do-item");

    const newItemContent = document.createElement("div");
    newItemContent.classList.add("item-content");

    const newItemP = document.createElement("p");
    newItemP.textContent = item;
    newItemContent.appendChild(newItemP);


    // Display time if enabled
    if (showTime) {
      const newItemTime = document.createElement("p");
      newItemTime.id = "item-time";
      newItemTime.textContent =  `Made: ${times[index]}`;
      newItemContent.appendChild(newItemTime);

      const newItemDate = document.createElement("p");
      newItemDate.id = "item-date";
      newItemDate.textContent = `On: ${dates[index]}`;
      newItemContent.appendChild(newItemDate);

    }

    // Buttons div for each task item
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    // Done button to mark task as completed
    const newItemDone = document.createElement("button");
    newItemDone.id = "done-task";
    newItemDone.onclick = () => doneTask(index);

    const newItemDoneIcon = document.createElement("i");
    newItemDoneIcon.classList.add("bx", "bx-check");
    newItemDone.appendChild(newItemDoneIcon);

    // Delete button to remove the task
    const newItemDelete = document.createElement("button");
    newItemDelete.id = "delete-task";
    newItemDelete.onclick = () => deleteTask(index);

    const newItemDeleteIcon = document.createElement("i");
    newItemDeleteIcon.classList.add("bx", "bx-trash");
    newItemDelete.appendChild(newItemDeleteIcon);

    buttons.appendChild(newItemDelete);
    buttons.appendChild(newItemDone);

    newItem.appendChild(newItemContent);
    newItem.appendChild(buttons);

    containerItem.appendChild(newItem);
  }

  const containerFinishedItem = document.getElementById("finished-items");
  containerFinishedItem.innerHTML = ""; // Clear completed tasks container
  
  // Display completed tasks if 'showDoneItems' is enabled
  if (showDoneItems) {
    const finishedHeader = document.createElement("p");
    finishedHeader.id = "task-header";
    finishedHeader.textContent = "Finished tasks:";
    containerFinishedItem.appendChild(finishedHeader);

    if (doneItems.length === 0) {
      const noFinishedTasksMessage = document.createElement("p");
      noFinishedTasksMessage.id = "no-tasks";
      noFinishedTasksMessage.textContent = "No finished tasks to be shown..";
      containerFinishedItem.appendChild(noFinishedTasksMessage);
    } else {
      // Render each completed task
      for (const [index, item] of doneItems.entries()) {
        const doneItemDiv = document.createElement("div");
        doneItemDiv.classList.add("to-do-item");

        const doneItemContent = document.createElement("div");
        doneItemContent.classList.add("item-content");

        const doneItemP = document.createElement("p");
        doneItemP.textContent = item;
        doneItemP.id = "done";
        doneItemContent.appendChild(doneItemP);


        // Display time if enabled
        if (showTime) {
          const doneItemTime = document.createElement("p");
          doneItemTime.id = "item-time";
          doneItemTime.textContent = `Finished: ${doneTimes[index]}`;
          doneItemContent.appendChild(doneItemTime);

          const doneItemDate = document.createElement("p");
          doneItemDate.id = "item-date";
          doneItemDate.textContent = `On: ${doneDates[index]}`;
          doneItemContent.appendChild(doneItemDate);
        }

        // Buttons div for each completed task
        const buttons = document.createElement("div");
        buttons.classList.add("buttons");
        
        // Delete button for completed tasks
        const doneItemDelete = document.createElement("button");
        doneItemDelete.id = "delete-task";
        doneItemDelete.onclick = () => deleteDoneTask(index);

        const doneItemDeleteIcon = document.createElement("i");
        doneItemDeleteIcon.classList.add("bx", "bx-trash");
        doneItemDelete.appendChild(doneItemDeleteIcon);

        buttons.appendChild(doneItemDelete);
        doneItemDiv.appendChild(doneItemContent);
        doneItemDiv.appendChild(buttons);

        containerFinishedItem.appendChild(doneItemDiv);
      }
    }
  }

  // Display the counts of remaining and finished tasks
  const totalItems = document.getElementById("total-items");
  totalItems.textContent = `Remaining tasks: ${items.length}`;

  const totalFinishedItems = document.getElementById("total-finished");
  totalFinishedItems.textContent = `Finished tasks: ${doneItems.length}`;

  const input = document.getElementById("task-input");
  input.value = ""; // Clear input field after task addition
}

// Load saved tasks from localStorage
function loadTasks() {
  const oldItems = localStorage.getItem("items");
  if (oldItems) items = JSON.parse(oldItems);

  const oldDates = localStorage.getItem("dates");
  if (oldDates) dates = JSON.parse(oldDates);

  const oldTimes = localStorage.getItem("time");
  if (oldTimes) times = JSON.parse(oldTimes);

  const oldDoneItems = localStorage.getItem("doneItems");
  if (oldDoneItems) doneItems = JSON.parse(oldDoneItems);

  const oldDoneDates = localStorage.getItem("doneDates");
  if (oldDoneDates) doneDates = JSON.parse(oldDoneDates);

  const oldDoneTimes = localStorage.getItem("doneTimes");
  if (oldDoneTimes) doneTimes = JSON.parse(oldDoneTimes);

  showTime = localStorage.getItem("showTime") === "true";
  showDoneItems = localStorage.getItem("showDoneItems") === "true";

  drawTasks();
}

// Save current tasks to localStorage
function saveTasks() {
  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("dates", JSON.stringify(dates));
  localStorage.setItem("time", JSON.stringify(times));
  localStorage.setItem("doneItems", JSON.stringify(doneItems));
  localStorage.setItem("doneDates", JSON.stringify(doneDates));
  localStorage.setItem("doneTimes", JSON.stringify(doneTimes));
  localStorage.setItem("showTime", showTime.toString());
  localStorage.setItem("showDoneItems", showDoneItems.toString());
}

// Add a new task
function addTask() {
  const newTask = document.getElementById("task-input").value;
  if (newTask === "") {
    taskStatus.style.color = "red";
    taskStatus.textContent = "Task is empty";
  } else if (!isNaN(Number(newTask))) {
    taskStatus.style.color = "red";
    taskStatus.textContent = "Task cannot only be a number";
  } else if (newTask.length > 25) {
    taskStatus.style.color = "red";
    taskStatus.textContent = "Task length is too big";
  } else {
    items.push(newTask);

    // Capture date and time of task creation
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    times.push(`${hours}:${minutes}:${seconds}`);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    dates.push(`${day}-${month}-${year}`);

    drawTasks();

    taskStatus.style.color = "green";
    taskStatus.textContent = "Task added";
  }
  saveTasks();
}

// Delete a task by index from active tasks
function deleteTask(index) {
  items.splice(index, 1);
  dates.splice(index, 1);
  times.splice(index, 1);
  drawTasks();

  taskStatus.style.color = "red";
  taskStatus.textContent = "Task deleted";

  saveTasks();
}

// Delete a completed task by index
function deleteDoneTask(index) {
  doneItems.splice(index, 1);
  doneDates.splice(index, 1);
  doneTimes.splice(index, 1);
  drawTasks();

  taskStatus.style.color = "red";
  taskStatus.textContent = "Finished task deleted";

  saveTasks();
}

// Mark a task as completed and move it to done lists
function doneTask(index) {
  doneItems.push(items[index]);
  doneDates.push(dates[index]);
  doneTimes.push(times[index]);

  items.splice(index, 1);
  dates.splice(index, 1);
  times.splice(index, 1);

  drawTasks();
  saveTasks();
}

// Toggle showing time for tasks
const showTimeInput = document.getElementById("show-time");
showTimeInput.addEventListener("click", () => {
  showTime = showTimeInput.checked;
  drawTasks();
  saveTasks();
});

// Toggle showing completed tasks
const showDoneItemsInput = document.getElementById("show-done");
showDoneItemsInput.addEventListener("click", () => {
  showDoneItems = showDoneItemsInput.checked;
  drawTasks();
  saveTasks();
});

// Load tasks when page is ready
document.addEventListener("DOMContentLoaded", loadTasks);

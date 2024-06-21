let taskList = [
  {
    completed: false,
    task: "Make your bed",
  },
  {
    completed: false,
    task: "Wash Dishes",
  },
  {
    completed: false,
    task: "feed the cat",
  },
];

let tbody = document.querySelector("#tbody");

function list() {
  tbody.innerHTML = ""; // Clear existing table body content

  // Iterate through taskList and create a row for each task
  taskList.map(function (task, index) {
    let tr = document.createElement("tr"); // Create a new row for each task
    tr.setAttribute("id", "task-" + index);
    tr.innerHTML = `
        <td class="tdata"><input type="checkbox" id="checkbox-${index}" ${
      task.completed ? "checked" : ""
    }></td>
        <td>${task.task}</td>
        <td id="status-${index}">
        <p id="classStyle-${index}" class="${
      task.completed ? "completed" : "in-progress"
    }">
        ${task.completed ? "Completed" : "In progress"}
      </p>
    </td>
        <td><button class='btn-danger btn' onClick="removeTask(${index})">Delete</button></td>
      `;

    tbody.appendChild(tr); // Append the new row to the table body

    document
      .getElementById(`checkbox-${index}`)
      .addEventListener("change", function (event) {
        const checkbox = event.target; // Access the triggering checkbox directly via event.target
        const classColor = document.getElementById(`classStyle-${index}`);
        task.completed = checkbox.checked; // Update the task completion status

        // Update the status text and classes
        classColor.textContent = task.completed ? "Completed" : "In progress";
        if (task.completed) {
          classColor.classList.remove("in-progress");
          classColor.classList.add("completed");
        } else {
          classColor.classList.remove("completed");
          classColor.classList.add("in-progress");
        }
      });
  });
}

list();

let addBtn = document.querySelector("#addNew");
let textBox = document.querySelector("#newTask");
addBtn.addEventListener("click", function () {
  const newTask = textBox.value.trim();
  if (newTask) {
    taskList.push({ task: newTask, completed: false });
    textBox.value = "";
  } else {
    alert("Please enter a task.");
  }

  list();
});
function removeTask(index) {
  tbody.innerHTML = "";
  taskList.splice(index, 1);
  list();
}

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});

window.onload = loadTasks;

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const tasks = getTasks();
    tasks.push({ text, completed: false });
    saveTasks(tasks);

    taskInput.value = "";
    loadTasks();
}

function loadTasks() {
    taskList.innerHTML = "";
    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) li.classList.add("completed");

        li.onclick = () => toggleTask(index);

        const del = document.createElement("button");
        del.innerHTML = "✕";
        del.onclick = e => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(del);
        taskList.appendChild(li);
    });

    updateStats(tasks);
}

function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}

function updateStats(tasks) {
    totalTasks.textContent = `${tasks.length} Tasks`;
    completedTasks.textContent =
        `${tasks.filter(t => t.completed).length} Completed`;
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const initialTasks = [
    { task: "Hacer lista de personas para cortesía de pastelitos", priority: "alta", completed: false },
    { task: "Hacer lista de personas para cortesía de cupcakes", priority: "alta", completed: false },
    { task: "Definir recipientes para entrega de cupcakes", priority: "alta", completed: false },
    { task: "Retirar permiso de salida de Jose", priority: "alta", completed: false },
    { task: "Mandar queso picado en cuadraditos a Isabela", priority: "alta", completed: false },
    { task: "Confirmar disfraz de Isabela", priority: "media", completed: false },
    { task: "Comprar en Santa Clara para cafetería", priority: "alta", completed: false },
    { task: "Comprar bandejas de aluminio para postres de tres leches", priority: "alta", completed: false },
    { task: "Verificar portatortas", priority: "alta", completed: false },
    { task: "Hacer menú para las próximas 2 semanas", priority: "media", completed: false }
];

const todoList = document.getElementById("todoList");
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");

function renderTasks() {
    todoList.innerHTML = "";
    initialTasks.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const priorityIndicator = document.createElement("span");
        priorityIndicator.className = `priority-indicator priority-${item.priority}`;

        const taskText = document.createElement("p");
        taskText.className = "task-text";
        if (item.completed) {
            taskText.classList.add("completed");
        }
        taskText.textContent = item.task;

        taskInfo.appendChild(priorityIndicator);
        taskInfo.appendChild(taskText);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeBtn = document.createElement("button");
        completeBtn.className = "action-complete";
        completeBtn.title = item.completed ? "Desmarcar tarea" : "Marcar como completada";
        completeBtn.onclick = () => toggleComplete(index);

        const priorityBtn = document.createElement("button");
        priorityBtn.className = "action-priority";
        priorityBtn.title = "Cambiar prioridad";
        priorityBtn.onclick = () => changePriority(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "action-delete";
        deleteBtn.title = "Eliminar tarea";
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(completeBtn);
        actions.appendChild(priorityBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(taskInfo);
        li.appendChild(actions);

        todoList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        initialTasks.push({ task: taskText, priority: priorityInput.value, completed: false });
        taskInput.value = "";
        renderTasks();
        taskInput.focus();
    }
}

function toggleComplete(index) {
    initialTasks[index].completed = !initialTasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    initialTasks.splice(index, 1);
    renderTasks();
}

function changePriority(index) {
    const priorities = ["alta", "media", "baja"];
    const current = initialTasks[index].priority;
    const newPriority = priorities[(priorities.indexOf(current) + 1) % priorities.length];
    initialTasks[index].priority = newPriority;
    renderTasks();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Render inicial de las tareas
renderTasks();

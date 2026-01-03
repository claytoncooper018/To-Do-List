document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");

    // Load tasks from API
    fetch("/tasks")
        .then(res => res.json())
        .then(tasks => tasks.forEach(addTaskToDOM));

    // Add new task
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("taskTitle").value;
        const priority = document.getElementById("taskPriority").value;

        fetch("/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, priority })
        })
        .then(res => res.json())
        .then(task => addTaskToDOM(task));

        taskForm.reset();
    });

    // Add task element to DOM
    function addTaskToDOM(task) {
        const li = document.createElement("li");
        li.className = `list-group-item d-flex justify-content-between align-items-center ${task.priority}`;
        li.dataset.id = task.id;

        const span = document.createElement("span");
        span.textContent = task.title;
        span.style.cursor = "pointer";
        if (task.status === "completed") span.classList.add("completed");

        // Toggle completion
        span.addEventListener("click", () => {
            const status = span.classList.contains("completed") ? "pending" : "completed";
            fetch(`/tasks/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            }).then(() => span.classList.toggle("completed"));
        });

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.className = "btn btn-sm btn-danger";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            fetch(`/tasks/${task.id}`, { method: "DELETE" })
                .then(() => li.remove());
        });

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    }
});

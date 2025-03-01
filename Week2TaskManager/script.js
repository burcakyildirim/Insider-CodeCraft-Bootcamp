const form = document.querySelector(".task-form");
const taskList = document.querySelector("#task-list");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#task-title").value.trim(); //TODO: why we use trim and value
    const description = document.querySelector("#text-desc").value.trim();
    const priority = document.querySelector('input[name="priority"]:checked');

    if(!title || !priority) {
        alert("Lütfen tüm alanları doldurunuz.");
        return; //TODO: why we use return
    }

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("task-title");
    titleContainer.textContent = title;

    const descContainer = document.createElement("div");
    descContainer.classList.add("task-desc");
    descContainer.textContent = description;
    
    const priorityContainer = document.createElement("div");
    priorityContainer.classList.add("task-priority");
    priorityContainer.textContent = `Öncelik: ${priority.value}`;

    const statusContainer = document.createElement("div");
    statusContainer.classList.add("task-status");
    statusContainer.textContent = "Durum: Tamamlanmadı";


    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("task-buttons");

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.textContent = "Tamamlandı";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Sil";

    buttonContainer.append(completeBtn, deleteBtn);
    taskDiv.append(titleContainer,descContainer,priorityContainer,statusContainer,buttonContainer);
    taskList.appendChild(taskDiv);

    form.reset();
});

taskList.addEventListener("click", (event) => {
    const clickedElement = event.target;
    const taskDiv = clickedElement.closest(".task");

    if(clickedElement.classList.contains("complete-btn")) {
        event.stopPropagation();
        const statusContainer = taskDiv.querySelector(".task-status");
        statusContainer.textContent = "Durum: Tamamlandı";
        taskDiv.classList.add("completed"); 
    }

    if(clickedElement.classList.contains("delete-btn")) {
        event.stopPropagation(); //TODO: BUNLARA TEKRAR BAK
        taskDiv.remove();
    }
})

const filterBtn = document.querySelector(".filter-completed");
let showCompleted = false;

filterBtn.addEventListener("click", () => {
    showCompleted = !showCompleted;
    const tasks = document.querySelectorAll(".task");

    tasks.forEach(task => {
        const status = task.querySelector(".task-status").textContent;
        if(showCompleted) {
            if(status.includes("Tamamlanmadı")) {
                task.style.display = "none";
            }
        } else {
            task.style.display = "block";
        }
    })
    filterBtn.textContent = showCompleted ? "Tüm Görevleri Göster" : "Sadece Tamamlananları Göster";
})

const sortBtn = document.querySelector(".sort-priority");

sortBtn.addEventListener("click", function () {
    const tasks = Array.from(document.querySelectorAll(".task"));
    const priorityOrder = { "Düşük": 1, "Orta": 2, "Yüksek": 3 };

    tasks.sort((a, b) => {
        const priorityA = a.querySelector(".task-priority").textContent.split(": ")[1];
        const priorityB = b.querySelector(".task-priority").textContent.split(": ")[1];
        return priorityOrder[priorityA] - priorityOrder[priorityB];
    });

    tasks.forEach(task => taskList.appendChild(task));
});

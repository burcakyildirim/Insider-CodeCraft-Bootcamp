const form = document.querySelector(".task-form");
const taskList = document.querySelector("#task-list");
const filterBtn = document.querySelector(".filter-completed");
const sortBtn = document.querySelector(".sort-priority");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#task-title").value.trim();
  const description = document.querySelector("#text-desc").value.trim();
  const priorityInput = document.querySelector('input[name="priority"]:checked');

  if (!title || !priorityInput) {
    alert("Lütfen tüm alanları doldurunuz.");
    return;
  }

  const task = createTaskElement(title, description, priorityInput.value);
  taskList.appendChild(task);

  form.reset();
});

function createTaskElement(title, description, priority) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.dataset.priority = priority;
  
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("task-title");
  titleContainer.textContent = title;

  const descContainer = document.createElement("div");
  descContainer.classList.add("task-desc");
  descContainer.textContent = description;

  const priorityContainer = document.createElement("div");
  priorityContainer.classList.add("task-priority");
  priorityContainer.textContent = `Öncelik: ${priority}`;

  const statusContainer = document.createElement("div");
  statusContainer.classList.add("task-status");
  statusContainer.textContent = "Durum: Tamamlanmadı";

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("task-buttons");

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");
  completeBtn.textContent = "Tamamlandı";
  completeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    statusContainer.textContent = "Durum: Tamamlandı";
    taskDiv.classList.add("completed");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Sil";
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    taskDiv.remove();
  });

  buttonContainer.append(completeBtn, deleteBtn);
  taskDiv.append(titleContainer, descContainer, priorityContainer, statusContainer, buttonContainer);

  return taskDiv;
}

let showCompleted = false;
filterBtn.addEventListener("click", () => {
  showCompleted = !showCompleted;
  document.querySelectorAll(".task").forEach((task) => {
    task.style.display = showCompleted && !task.classList.contains("completed") ? "none" : "block";
  });
  filterBtn.textContent = showCompleted ? "Tüm Görevleri Göster" : "Sadece Tamamlananları Göster";
});

let isSorted = false;
sortBtn.addEventListener("click", () => {
  const tasks = [...taskList.children];
  const priorityOrder = { Düşük: 1, Orta: 2, Yüksek: 3 };

  if (!isSorted) {
    tasks.sort((a, b) => priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority]);
    sortBtn.textContent = "Normal Sıraya Dön";
  } else {
    tasks.sort((a, b) => taskList.appendChild(a) - taskList.appendChild(b));
    sortBtn.textContent = "Önceliğe Göre Sırala";
  }

  tasks.forEach(task => taskList.appendChild(task));
  isSorted = !isSorted;
});
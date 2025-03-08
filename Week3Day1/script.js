const form = $(".task-form");
const taskList = $("#task-list");
const taskInput = $("#task-input");

form.on("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.val().trim();

  if (!taskText) {
    alert("Lütfen bir görev giriniz.");
    return;
  }

  taskList.append(createTaskElement(taskText));
  taskInput.val("");
});

function createTaskElement(taskText) {
  const taskItem = $(
    `<li class="task">
      <span class="task-text">${taskText}</span>
      <div class="task-buttons">
        <button class="complete-btn">Tamamlandı</button>
        <button class="delete-btn">Sil</button>
      </div>
    </li>`
  );

  taskItem.find(".complete-btn").on("click", function () {
    taskItem.toggleClass("completed");
  });

  taskItem.find(".delete-btn").on("click", function () {
    taskItem.remove();
  });

  return taskItem;
}
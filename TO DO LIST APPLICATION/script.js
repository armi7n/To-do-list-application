const input = document.querySelector(".inputForClass");
const addBtn = document.querySelector(".addbtn");
const deleteBtn = document.querySelector(".deletebtn");
const list = document.querySelector(".to_do_list");

let todos = [];
let editIndex = null;


document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});

function loadTodos() {
  const saved = localStorage.getItem("todos");
  if (saved) todos = JSON.parse(saved);
  else todos = [];
  renderList();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderList() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.checked;
    checkbox.addEventListener("change", () => {
      todo.checked = checkbox.checked;
      saveTodos();
      renderList();
    });

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.style.flex = "1";
    span.style.marginLeft = "10px";
    span.style.textAlign = "left";
    if (todo.checked) {
      span.style.textDecoration = "line-through";
      span.style.color = "#7BAFD4";
    } else {
      span.style.textDecoration = "none";
      span.style.color = "black";
    }

    const editBtn = document.createElement("button");
    editBtn.textContent = "✍️";
    editBtn.style.border = "none";
    editBtn.style.background = "transparent";
    editBtn.style.cursor = "pointer";
    editBtn.title = "Edit this task";

    editBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const { value: newText } = await Swal.fire({
        title: "Edit Task",
        input: "text",
        inputLabel: "Enter new task text:",
        inputValue: todo.text,
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
      });

      if (newText !== undefined && newText.trim() !== "") {
        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to save changes?",
          icon: "question",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Yes, save it",
          denyButtonText: "No, don't save",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            todos[index].text = newText.trim();
            saveTodos();
            renderList();
            Swal.fire("Saved ✅", "", "success");
          } else if (result.isDenied) {
            Swal.fire("Changes not saved", "", "info");
          }
        });
      }
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    list.appendChild(li);
  });
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") {
    Swal.fire("Please enter a task!", "", "warning");
    return;
  }

  todos.push({ text: text, checked: false });
  input.value = "";
  saveTodos();
  renderList();
});

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  todos = todos.filter((t) => !t.checked);
  saveTodos();
  renderList();
});

loadTodos();

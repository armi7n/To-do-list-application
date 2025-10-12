const input = document.querySelector(".inputForClass");
const addBtn = document.querySelector(".addbtn");
const deleteBtn = document.querySelector(".deletebtn");
const showBtn = document.querySelector(".showbtn");
const list = document.querySelector(".to_do_list");

let todos = [];
let editIndex = null;

// --- جلوگیری از reload فرم ---
document.querySelector("form").addEventListener("submit", (e) => e.preventDefault());

// --- خواندن داده از Local Storage ---
function loadTodos() {
  const saved = localStorage.getItem("todos");
  if (saved) {
    todos = JSON.parse(saved);
  } else {
    todos = [];
  }
  renderList();
}

// --- ذخیره در Local Storage ---
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// --- رندر کردن لیست ---
function renderList() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";
    li.style.padding = "5px 10px";
    li.style.borderRadius = "6px";
    li.style.marginBottom = "6px";
    li.style.backgroundColor = "#e6f3ff";

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.checked;
    checkbox.addEventListener("change", () => {
      todo.checked = checkbox.checked;
      saveTodos();
      renderList();
    });

    // متن آیتم
    const span = document.createElement("span");
    span.textContent = todo.text;
    span.style.flex = "1";
    span.style.marginLeft = "10px";
    span.style.textAlign = "left";
    if (todo.checked) {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    } else {
      span.style.textDecoration = "none";
      span.style.color = "black";
    }

    // دکمه ویرایش ✏️
    const editBtn = document.createElement("button");
    editBtn.textContent = "✍️";
    editBtn.style.border = "none";
    editBtn.style.background = "transparent";
    editBtn.style.cursor = "pointer";
    editBtn.title = "ویرایش این آیتم";

    editBtn.addEventListener("click", (e) => {
      e.preventDefault(); // جلوگیری از ریلود
      input.value = todo.text;
      editIndex = index;
      addBtn.textContent = "Save Edit";
      input.focus();
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
    alert("لطفاً مقداری وارد کنید!");
    return;
  }

  if (editIndex !== null) {
    todos[editIndex].text = text;
    editIndex = null;
    addBtn.textContent = "Add";
  } else {
   
    todos.push({ text: text, checked: false });
  }

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

showBtn.addEventListener("click", (e) => {
  e.preventDefault();
  renderList();
});


loadTodos();


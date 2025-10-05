
'use strict';

const addbtn = document.querySelector(".addbtn"); /// دکمه اضافه
const deletebtn = document.querySelector(".deletebtn"); // دکمه حذف
const showbtn = document.querySelector(".showbtn");  // دکمه نمایش 
const editbtn = document.querySelector(".editbtn");  // دکمه ادیت
const input = document.querySelector(".inputForClass"); // ورودی 
const list = document.querySelector(".to_do_list");

// -------------------  save in localStorage -------------------
function saveToLocalStorage() {
    const items = [];
    document.querySelectorAll(".to_do_list li").forEach(li => {
        const checkbox = li.querySelector("input[type='checkbox']");
        items.push({
            text: li.querySelector("span").textContent,
            checked: checkbox.checked
        });
    });
    localStorage.setItem("todos", JSON.stringify(items));
}
 // ------------------  load local storage  -------------------

function loadFromLocalStorage() {
    const savedItems = JSON.parse(localStorage.getItem("todos")) || [];
    savedItems.forEach(item => {
        createListItem(item.text, item.checked);
    });
}

// ------------------- ساخت li -------------------
function createListItem(text, checked = false) {
    const li = document.createElement("li");

    // چک‌باکس
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;

    // متن
    const span = document.createElement("span");
    span.textContent = text;

    li.appendChild(checkbox);
    li.appendChild(span);

    list.appendChild(li);
}

// ------------------- ADD -------------------
addbtn.addEventListener('click', function (e) {
    e.preventDefault();

    const vorodi = input.value.trim();
    if (vorodi === '') {
        alert("لطفا یک مقدار وارد کنید ");
        return;
    }

    createListItem(vorodi);
    saveToLocalStorage();
    input.value = "";
});

// ------------------- DELETE ALL -------------------
deletebtn.addEventListener('click', function (e) {
    e.preventDefault();
    list.innerHTML = "";
    saveToLocalStorage();
});

// ------------------- حذف تکی با کلیک روی آیتم -------------------
list.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveToLocalStorage();
    }
});

// ------------------- SHOWBUTTON -------------------
showbtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (list.style.display === 'none') {
        list.style.display = 'block';
    } else {
        list.style.display = 'none';
    }
});

// ------------------- EDIT -------------------
editbtn.addEventListener("click", function (e) {
    e.preventDefault();

    const checkedItems = list.querySelectorAll("li input[type='checkbox']:checked");

    if (checkedItems.length === 0) {
        alert("هیچ آیتمی انتخاب نشده است!");
        return;
    }

    checkedItems.forEach(cb => {
        const span = cb.nextElementSibling;
        const newText = prompt("متن جدید را وارد کنید:", span.textContent);
        if (newText && newText.trim() !== "") {
            span.textContent = newText.trim();
        }
    });

    saveToLocalStorage();
});

loadFromLocalStorage();







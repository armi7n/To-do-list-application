'use strict';
// اینها ساده سازی هستن برای اینکه هر بار انتخاب نکنیم المنت یا کلاسی رو و با استفادهاز متغیر داده شده این کار با با راه متد انحام بدیم
const addbtn = document.querySelector(".addbtn"); /// دکمه اضافه
const deletebtn = document.querySelector(".deletebtn"); // دکمه حذف
const showbtn = document.querySelector(".showbtn");  // دکمه نمایش 
const input = document.querySelector(".inputForClass"); // دکمه اینپوت یا همون ورودی 
// و در آخر برای لیستهم باید سلکشنی در نظر گرفت
const list = document.querySelector(".to_do_list");
//  ------------------- ADD -------------------
addbtn.addEventListener('click', function (enteranyword) {

    enteranyword.preventDefault();

    // این کار باعث میشه موقع زدن روی دکمه اضافه کردن رفرش رخ ندهد
    const vorodi = input.value.trim();
    if (vorodi == '') {
        // console.log('لطفا یک مقدار وارد کنید');
        alert("لطفا یک مقدار وارد کنید ")
        return;
    } 
    //  li  رو تعریف میکنیم تا نماینده سلکتور ما باشه
    const li = document.createElement('li');
    // هر بار که روی دکمه اضافه کردن کلیک کنیم باید مقداری که کاربر میده رو ذخیره کنه که این کار به شکل زیر انجام میشهّ
    li.textContent = vorodi;
    list.appendChild(li);
    
    // فرایند دادن ورودی 
    
    input.value = ""; // باعث خالی کردن میشه بعد پایان عملیات
});


//  ------------------- DELETE -------------------

deletebtn.addEventListener('click', function (enteranyword) {
    enteranyword.preventDefault();
    //  این کار کل لیست رو پاک میکنه که ما همین رو میخوایم
    list.innerHTML = "";
})


//  ------------------- SHOWBUTTON -------------------
// کل این دکمه هم کار نمایش رو بر عهده دارد
showbtn.addEventListener('click', function (enteranyword) {
    enteranyword.preventDefault();
    if (list.style.display == 'none') {
        list.style.display = 'block';
    } else if
        (list.style.display == 'block') {
        list.style.display = 'none';
    }
}
)















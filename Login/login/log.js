const addPostBtn=document.getElementById('addBtn');
document.querySelector(".btn").addEventListener("click", function (event) {
    event.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        alert("המשתמש אינו רשום, אנא הרשם תחילה");
        return;
    }

    const usernameInput = document.querySelector("input[placeholder='שם משתמש']").value;
    const passwordInput = document.querySelector("input[placeholder='סיסמה']").value;

    if (usernameInput.toLowerCase() === savedUser.name.toLowerCase() && passwordInput === savedUser.password) {
        alert("ברוך הבא, " + savedUser.name);
        window.location.href = "../../StamTech/index.html";
        addPostBtn.style.display='block';
    } else {
        alert("המשתמש לא נמצא, אנא בדוק את הפרטים שהזנת");
    }
});

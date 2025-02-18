document.querySelector(".btn").addEventListener("click", function (event) {
    event.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        alert("No user registered! Please sign up first.");
        return;
    }

    const usernameInput = document.querySelector("input[placeholder='Username']").value;
    const passwordInput = document.querySelector("input[placeholder='Password']").value;

    if (usernameInput.toLowerCase() === savedUser.name.toLowerCase() && passwordInput === savedUser.password) {
        alert("Login successful! Welcome, " + savedUser.name);
        window.location.href = window.location.origin + "/StamTech/index.html";
    } else {
        alert("User not found! Please check your details.");
    }
});

    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault(); 

        const userData = {
            name: document.getElementById("name").value,
            password:document.getElementById('password').value,
            mail:document.getElementById('email').value,
            diploma: document.querySelector("input[name='diploma']:checked")?.value,
            ritualBath: document.querySelector("input[name='ritual_bath']:checked")?.value,
            beard: document.querySelector("input[name='beard']:checked")?.value,
            phoneUsage: document.querySelector("input[name='phone']:checked")?.value,
            phone: document.getElementById("phone").value,
            torahStudies: document.querySelector("input[name='torah_studies']:checked")?.value
        };

        localStorage.setItem("user", JSON.stringify(userData));

        alert("Registration successful!");
        window.location.href = "../login/log.html";
    });
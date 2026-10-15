
const API_URL = "/api";

const loginForm = document.getElementById("adminLoginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    loginMessage.textContent = "Checking login...";

    try {
        const response = await fetch(`${API_URL}/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            loginMessage.textContent =
                data.error || "Login failed. Please try again.";
            return;
        }

        loginMessage.textContent = "Login successful!";

        // Temporary: confirm login before building the admin dashboard.
        window.location.href = "/dashboard.html";
    } catch (error) {
        loginMessage.textContent =
            "Cannot connect to the backend. Check if the server is running.";
        console.error(error);
    }
});

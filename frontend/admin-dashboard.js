
const API_URL = "http://127.0.0.1:5000/api";

const adminMessage = document.getElementById("adminMessage");
const adminIssues = document.getElementById("adminIssues");
const logoutBtn = document.getElementById("logoutBtn");

async function loadAdminDashboard() {
    try {
        // First, verify the admin session
        const sessionResponse = await fetch(
            `${API_URL}/admin/session`,
            { credentials: "include" }
        );

        if (!sessionResponse.ok) {
            window.location.href = "admin.html";
            return;
        }

        // Load the complaints
        const response = await fetch(`${API_URL}/issues`);

        if (!response.ok) {
            throw new Error("Could not load complaints");
        }

        const issues = await response.json();

        adminIssues.replaceChildren();

        if (issues.length === 0) {
            adminMessage.textContent = "No complaints have been reported yet.";
            return;
        }

        adminMessage.textContent = `Total complaints: ${issues.length}`;

        issues.forEach(issue => {
            const card = document.createElement("article");
            card.className = "admin-issue-card";
            const title = document.createElement("h3");
            const details = document.createElement("p");
            const statusText = document.createElement("p");
            statusText.className = "admin-issue-status";
            const statusSelect = document.createElement("select");
            statusSelect.className = "admin-status-select";
            const updateButton = document.createElement("button");
            updateButton.className = "admin-update-button";
            const message = document.createElement("p");
            message.className = "admin-update-message";

            title.textContent = issue.title;
            details.textContent =
                `Location: ${issue.location} | Category: ${issue.category} | Priority: ${issue.priority}`;

            statusText.textContent = `Current status: ${issue.status}`;

            ["Open", "In Progress", "Resolved"].forEach(status => {
                const option = document.createElement("option");
                option.value = status;
                option.textContent = status;
                statusSelect.appendChild(option);
            });

            statusSelect.value = issue.status;
            updateButton.textContent = "Update Status";

            updateButton.addEventListener("click", async () => {
                updateButton.disabled = true;
                message.textContent = "Updating status...";

                try {
                    const updateResponse = await fetch(
                        `${API_URL}/issues/${issue.id}/status`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include",
                            body: JSON.stringify({
                                status: statusSelect.value
                            })
                        }
                    );

                    const result = await updateResponse.json();

                    if (updateResponse.status === 401) {
                        window.location.href = "admin.html";
                        return;
                    }

                    if (!updateResponse.ok) {
                        throw new Error(
                            result.error || "Status update failed"
                        );
                    }

                    message.textContent = "Status updated successfully!";
                    statusText.textContent =
                        `Current status: ${result.status}`;
                } catch (error) {
                    message.textContent = error.message;
                } finally {
                    updateButton.disabled = false;
                }
            });

            card.append(
                title,
                details,
                statusText,
                statusSelect,
                updateButton,
                message
            );

            adminIssues.appendChild(card);
        });
    } catch (error) {
        adminMessage.textContent =
            "Could not connect to the CampusFix backend.";
        console.error(error);
    }
}

logoutBtn.addEventListener("click", async () => {
    try {
        await fetch(`${API_URL}/admin/logout`, {
            method: "POST",
            credentials: "include"
        });
    } finally {
        window.location.href = "admin.html";
    }
});

loadAdminDashboard();


window.API_URL = "/api";

// Get all saved issues from the backend
async function getIssues() {
    const response = await fetch(`${API_URL}/issues`);

    if (!response.ok) {
        throw new Error("Could not load issues");
    }

    const data = await response.json();
    // console.log(Array.isArray(data));
    return data;
}
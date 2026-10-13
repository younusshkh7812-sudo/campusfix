
const totalIssues = document.getElementById("totalIssues");
const openIssues = document.getElementById("openIssues");
const progressIssues = document.getElementById("progressIssues");
const resolvedIssues = document.getElementById("resolvedIssues");
const issuesContainer = document.getElementById("issuesContainer");
const issueCount = document.getElementById("issueCount");
const errorMessage = document.getElementById("errorMessage");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");


async function loadIssues() {
    try {
        const issues = await getIssues();

        // Update statistics
        totalIssues.textContent = issues.length;

        openIssues.textContent = issues.filter(
            issue => issue.status.toLowerCase() === "open"
        ).length;

        progressIssues.textContent = issues.filter(
            issue => issue.status.toLowerCase() === "in progress"
        ).length;

        resolvedIssues.textContent = issues.filter(
            issue => issue.status.toLowerCase() === "resolved"
        ).length;

        // Display issues using the filters
        displayIssues(issues);

        issueCount.textContent =
    `Total issues reported: ${issues.length}`;

        errorMessage.textContent = "";
    } catch (error) {
        console.error("Error loading issues:", error);
        issueCount.textContent = "Could not load issues.";
        errorMessage.textContent =
            "Please check whether the CampusFix backend is running.";
    }
}

loadIssues();
searchInput.addEventListener("input", loadIssues);
statusFilter.addEventListener("change", loadIssues);
priorityFilter.addEventListener("change", loadIssues);

function displayIssues(issues) {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;
    const selectedPriority = priorityFilter.value;

    const filteredIssues = issues.filter(issue => {
        const matchesSearch =
            issue.title.toLowerCase().includes(searchText) ||
            issue.location.toLowerCase().includes(searchText);

        const matchesStatus =
            selectedStatus === "All" ||
            issue.status.toLowerCase() === selectedStatus.toLowerCase();

        const matchesPriority =
            selectedPriority === "All" ||
            issue.priority.toLowerCase() === selectedPriority.toLowerCase();

        return matchesSearch && matchesStatus && matchesPriority;
    });

    issuesContainer.replaceChildren();

    issueCount.textContent =
    `Showing ${filteredIssues.length} of ${issues.length} issues`;
if (filteredIssues.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "empty-state";

    const heading = document.createElement("h3");
    heading.textContent = "No issues found";

    const message = document.createElement("p");
    message.textContent =
        "Try changing your search or filter selections.";

    emptyMessage.append(heading, message);
    issuesContainer.appendChild(emptyMessage);
    return;
}

    filteredIssues.forEach(issue => {
        const card = document.createElement("article");
        card.className = "issue-card";

        const title = document.createElement("h3");
        title.textContent = issue.title;

        const category = document.createElement("p");
        category.textContent = `Category: ${issue.category}`;

        const location = document.createElement("p");
location.textContent = `Location: ${issue.location}`;
const priority = document.createElement("p");
priority.className =
    `issue-badge priority-${issue.priority.toLowerCase()}`;
priority.textContent = `Priority: ${issue.priority}`;

const status = document.createElement("p");
status.className =
    `issue-badge status-${issue.status.toLowerCase().replace(/\s+/g, "-")}`;
status.textContent = `Status: ${issue.status}`;
        const description = document.createElement("p");
        description.textContent =
            `Description: ${issue.description || "No description"}`;

        card.append(title, category, location, priority, status, description);
        issuesContainer.appendChild(card);
    });
}
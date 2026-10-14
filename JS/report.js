const input = document.getElementById("issueTitle");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const loc= document.getElementById("location");
const description = document.getElementById("description");
const submitbtn = document.getElementById("submitBtn");


submitbtn.addEventListener("click",()=>{
    if(!input.value.trim()){
        alert("Please enter issue title!");
        return
    }
    else if (!loc.value.trim()){
        alert("Please enter location!");
        return
    }
    else{
    console.log("Issue:", input.value);
    console.log("Priority:", priority.value);
    console.log("category:", category.value);
    console.log("location:", loc.value);
    console.log("Description:", description.value);
    console.log("Status:","open")
    const issue = {
    title: input.value,
    priority: priority.value,
    category: category.value,
    location: loc.value,
    description: description.value,
    status: "open",
};
console.log(issue)
fetch(`${API_URL}/issues`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(issue)
})
.then(response => {
    if (!response.ok) {
        throw new Error("Issue submit failed");
    }
    return response.json();
})
.then(data => {
    console.log(data);
    alert("Issue submitted successfully!");

    input.value = "";
    description.value = "";
    loc.value = "";
})
.catch(error => {
    console.error("Error:", error);
    alert("Issue not submitted! Please try again.");
})
}});
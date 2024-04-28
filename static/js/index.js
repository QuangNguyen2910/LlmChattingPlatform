document.getElementById("link-container").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get the API endpoint value from the input field
    var apiEndpoint = document.getElementById("link-input").value;
    if (!apiEndpoint) { // If the API endpoint value is empty
        alert("Please enter a valid API endpoint"); // Show an alert
        return; // Exit the function
    }
    console.log(apiEndpoint); // Log the API endpoint value to the console
    // Save the API endpoint value to localStorage or sessionStorage
    localStorage.setItem("apiEndpoint", apiEndpoint); // Use localStorage for persistent storage or sessionStorage for temporary storage
    
    // Redirect to the next HTML page
    window.location.href = "templates/home.html";
});
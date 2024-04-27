document.getElementById("message-input").addEventListener("keydown", function(event) {
    if (event.keyCode === 13) { // "Enter" key
        event.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value.trim();
    if (message === "") {
        return; // Don't send empty messages
    }
    addMessage("You", message);
    // Call API to get response
    try {
        const response = await fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        const botResponse = data.response; // Assuming the API returns a 'response' field
        addMessage("Bot", botResponse);
    } catch (error) {
        console.error('Error:', error);
        addMessage("Bot", "Sorry, an error occurred. Please try again later.");
    }
    messageInput.value = ""; // Clear input field after sending message
}

function addMessage(user, text) {
    var chatMessages = document.getElementById("chat-messages");
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    var userSpan = document.createElement("span");
    userSpan.classList.add("user");
    userSpan.textContent = user;
    var textSpan = document.createElement("span");
    textSpan.classList.add("text");
    textSpan.textContent = text;
    messageDiv.appendChild(userSpan);
    messageDiv.appendChild(textSpan);
    chatMessages.appendChild(messageDiv);
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
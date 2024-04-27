document.getElementById("message-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // "Enter" key
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
    messageInput.value = ""; // Clear input field after sending message
    // Call API to get response
    var apiEndpoint = localStorage.getItem("apiEndpoint");
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message }),
            timeout: 10000 // 10 seconds
        });
        const data = await response.json();
        const botAnswer = data.answer; // Assuming the API returns an 'answer' field
        addMessage("Bot", botAnswer);
    } catch (error) {
        console.error('Error:', error);
        addMessage("Bot", "Sorry, an error occurred. Please try again later. / Xin lỗi hiện tại tôi không thể trả lời. Vui lòng thử lại sau.");
    }
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
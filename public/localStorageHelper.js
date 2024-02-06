(function() {
    const app = document.querySelector(".app");
    const socket = io();

    let uname;
    let hasJoined = false;

    // Load username and messages from local storage when the page loads
    window.addEventListener('load', function() {
        const storedUsername = localStorage.getItem('username');
        const storedMessages = localStorage.getItem('messages');
        
        if (storedUsername) {
            uname = storedUsername;
            joinChat();
        }

        if (storedMessages) {
            const messages = JSON.parse(storedMessages);
            messages.forEach(message => renderMessage(message.type, message.data));
        }
    });

    app.querySelector(".join-screen #join-user").addEventListener("click", function() {
        let username = app.querySelector(".join-screen #username").value;
        if (username.length === 0) {
            return;
        }
        uname = username;
        localStorage.setItem('username', username);
        joinChat();
    });

    app.querySelector(".chat-screen #send-message").addEventListener("click", function() {
        let message = app.querySelector(".chat-screen #message-input").value;
        if (message.length === 0) {
            return;
        }
        renderMessage("my", {
            username: uname,
            text: message,
        });
        socket.emit("chat", {
            username: uname,
            text: message,
        });

        // Save message to local storage
        saveMessageToLocalStorage({
            type: 'my',
            data: {
                username: uname,
                text: message,
            }
        });

        app.querySelector(".chat-screen #message-input").value = "";
    });

    app.querySelector(".chat-screen #exit-chat").addEventListener("click", function() {
        socket.emit("exituser", uname);
        localStorage.removeItem('username');
        localStorage.removeItem('messages');
        window.location.href = window.location.href;
    });

    socket.on("update", function(update) {
        renderMessage("update", update);
    });

    socket.on("chat", function(message) {
        renderMessage("other", message);

        // Save message to local storage
        saveMessageToLocalStorage({
            type: 'other',
            data: message,
        });
    });

    function joinChat() {
        if (!hasJoined) {
            socket.emit("newuser", uname);
            hasJoined = true;
        }
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    }

    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");
        if (type === "my") {
            let el = document.createElement("div");
            el.setAttribute('class', "message my-message");
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type === "other") {
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type === "update") {
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerHTML = message;
            messageContainer.appendChild(el);
        }

        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

    function saveMessageToLocalStorage(message) {
        let messages = loadFromLocalStorage('messages') || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function loadFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
})();

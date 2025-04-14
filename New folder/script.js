const { response } = require("express");

(function() {
    const app = document.querySelector(".app");
    const socket = io();

    let uname;
    let img;

    window.addEventListener('load',
    function () {
        storedUsername = localStorage.getItem('username');
        storedAvatar = localStorage.getItem('avatar');
        if (storedUsername) {
            uname = storedUsername;
            avatarUrl = storedAvatar;
            joinChat();
        }
        
    });
    app.querySelector(".join-screen #join-user").addEventListener("click", function() {
        let username = app.querySelector(".join-screen #username").value;
        if (username.length === 0) {
            alert('werey enter valid user');
            return;
        }
        const avatarFile = app.querySelector(".join-screen #avatar").files[0];
        if (avatarFile) {
            uploadAvatar(avatarFile, function (url) {
                avatarUrl = url;
                localStorage.setItem('avatar', avatarUrl);
                joinChat();
                console.log('succes');
            });
        } else {
            joinChat();
            console.log('continue without it');
        }
        socket.emit("newuser", username);
        uname = username;
        localStorage.setItem('username', username);
        joinChat();
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    });

    function uploadAvatar(file, callback) {
        const formData = new formData;
        formData.append('avatar', file);

        fetch('/upload-avatar', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            callback(data.avatarUrl);
        })
        .catch(error => {
            console.error("Error! Error! Error!", 'Error uploading avatar')
        });
    }

    function joinChat() {
        socket.emit("newuser", uname, avatarUrl);
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    }

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
        app.querySelector(".chat-screen #message-input").value = "";
    });

    app.querySelector(".chat-screen #exit-chat").addEventListener("click", function() {
        socket.emit("exituser", uname);
        window.location.href = window.location.href;
    });

    socket.on("update", function(update) {
        renderMessage("update", update);
    });

    socket.on("chat", function(message) {
        renderMessage("other", message);
    });

    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");
        if (type === "my") {
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `
            <div class="avatar">
                    <img src="${message.avatarUrl}" alt="${message.username}"
                    />
                    </div>
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
                <div class="avatar">
                    <img src="${message.avatarUrl}" alt="${message.username}"
                    />
                    </div>
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
})();
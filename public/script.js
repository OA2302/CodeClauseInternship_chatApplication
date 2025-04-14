(function() {
    const app = document.querySelector(".app");
    const socket = io();

    let uname;

    app.querySelector(".join-screen #join-user").addEventListener("click", function() {
        let username = app.querySelector(".join-screen #username").value;
        if (username.length === 0) {
            return;
        }
        socket.emit("newuser", username);
        uname = username;
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
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

    const input = document.getElementById('avatar');
    const output = document.getElementById('output');

    input.addEventListener('change', (e) =>{
        const image  = input.file[0];
        const imageUrl = URL.createObjectURL(image);
        output.src = imageUrl;
    })

    const textareaValue = textarea.value.replace(/\n/g, '<br>');

    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");
        if (type === "my") {
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `
                <div>
                    <div class="name" style="text-align: right;">You</div>
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
})();

// resize height for desktop
let isResizing = false;

function startDrag(e) {
    isResizing = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopDrag);
}

function handleMouseMove(e) {
    if (isResizing) {
        const newHeight = Math.min(550, window.innerWidth - e.clientX);
        document.getElementById('con').style.width = `${newHeight}px`;
    }
}

function stopDrag() {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopDrag);
}
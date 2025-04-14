const express = require("express");
const path = require("path");
const multer = require('multer');
const port = 5000


const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);


io.on("connection", function(socket) {
    socket.on("newuser", function(username) {
        socket.broadcast.emit("update", username + " joined the Conversation");
    });

    socket.on("exituser", function(username) {
        socket.broadcast.emit("update", username + " left the Conversation");
    });

    socket.on("chat", function(message) {
        socket.broadcast.emit("chat", message);
    });
});
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({
    storage: storage
});


app.post('/upload', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    res.send(`File uploaded successfully: ${req.file.filename}`);
});

app.get('/', (req, res) => {
    res.send('Hello world');
}
)
*/
app.listen(5000, () => {
    console.log(`Server listening on port 5000. Copy 
                 http://localhost:5000/`);
});
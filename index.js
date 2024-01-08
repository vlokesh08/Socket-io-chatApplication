const express = require('express');
const { createServer} = require('http');
const app = express();
const server = createServer(app);
const { Server } = require('socket.io');
const path = require('path');
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

io.on("connection", (socket) => {
    // io.emit("user connected", socket.id);
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
})

app.get('/', (req,res)=>{
    res.sendFile("./public/index.html");
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})

import express from 'express';
import {createServer} from 'http'
import {Server} from 'socket.io'
import cors from 'cors'

const app = express();
const port = 8000;
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        credentials: true,
    }
});

app.use(
    cors({
    origin: "http://localhost:5173",
    credentials: true, 
 }));

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("chat", (data) => {
        io.emit("chat", data);
        console.log(data);
    })
})

server.listen(port, () => {
 console.log('listening on port', port);
})

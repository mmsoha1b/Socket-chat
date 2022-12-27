const http = require('http');
const app = require('./app');
const io = require('./config/utils/websocket');
require('dotenv').config()
const PORT = process.env.PORT;

io.on("connection",socket=>{
    socket.on('postMessage',(savedMessage)=>{
        console.log(savedMessage)
        io.emit('broadcastMessage',savedMessage)
    })
});
const server = http.createServer(app);
server.listen(PORT,()=>{
    console.log(`Servre listening on port ${PORT}`)
})
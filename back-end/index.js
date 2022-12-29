const http = require('http');
const app = require('./app');
require('dotenv').config()
const PORT = process.env.PORT;

const server = http.createServer(app);
const io = require('socket.io')(server,{
    cors:{
        origin:'*'
    }
});

io.on("connection",socket=>{
    socket.on('postMessage',(savedMessage)=>{
        io.emit('broadcastMessage',savedMessage)
    })
});

server.listen(PORT,()=>{
    console.log(`Servre listening on port ${PORT}`)
})
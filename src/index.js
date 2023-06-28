const path = require('path')
const http = require('http')
const express  = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)

const io = socketio(server)


const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0;
io.on('connection', (socket)=>{
    console.log("new connection")

    socket.broadcast.emit('message', 'A new user has joined')

    socket.on('sendMessage', (message,callback)=>{
        io.emit('message', message)
        console.log("Message received", message)
        callback('Message delivered')
    })

    socket.on('disconnect', ()=>{
        io.emit('message', 'user has left')
    })
})

server.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})

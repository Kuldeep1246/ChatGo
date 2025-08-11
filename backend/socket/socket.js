// import io from 'socket.io'
import {Server} from 'socket.io'
import express from 'express'
import http from 'http'

let app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'https://chatgo-frontend.onrender.com'
    }
})
export const userSocket = {}

export const getReceiverSocketId = (receiver)=>{
    return userSocket[receiver]
}
io.on('connection',(socket)=>{

    const userId = socket.handshake.query.userId;
    if(userId){
        userSocket[userId] = socket.id
    }

    io.emit('getOnlineUsers',Object.keys(userSocket))
    socket.on('disconnect',()=>{
        delete userSocket[userId]
        io.emit('getOnlineUsers',Object.keys(userSocket))
    })
})


export {app,server,io}

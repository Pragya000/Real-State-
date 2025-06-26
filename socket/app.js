import {Server} from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();

const server = createServer(app);

const io = new Server (server, {
    cors:{
        origin: "https://real-state-zeta-eight.vercel.app",
        methods: ["GET", "POST"]
    },
});


let onlineUser = []
 
const addUser = (userId, socketId) =>{
    const userExists = onlineUser.find( user => user.userId === userId);
    if(!userExists){
        onlineUser.push({userId ,socketId});
    }
}

const removeUser = (socketId) =>{
    onlineUser = onlineUser.filter( (user) => user.socketId !== socketId);
}

const getUser = (userId) =>{
    return onlineUser.find( (user) => user.userId === userId);
}
io.on("connection" , (socket)=>{
    socket.on('newUser' , (userId)=>{
         
        addUser( userId , socket.id) ;
        console.log(">> Added new user:", userId);
        console.log("Online users are :" , onlineUser);
    });

socket.on("sendMessage" , ({ receiverId , data})=>{
    
console.log("Trying to send message to:", receiverId);
    const receiver = getUser(receiverId)
    if(receiver){
        console.log("Found receiver:", receiver);
    io.to(receiver.socketId).emit("getMessage" ,{ ...data,
        chatId: data.chatId,
    });
    }
    else{
        console.log(`User id ${receiverId} is not online`)
    }
});

    socket.on("disconnect" , ()=>{
        removeUser(socket.id);
    })
});

 const PORT = process.env.PORT || 4000;
 server.listen(PORT, () => {
   console.log(`Socket.IO server running on port ${PORT}`);
 });

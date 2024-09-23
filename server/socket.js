import { Server as SocketIoServer } from "socket.io";
import Message from "./models/MessagesModel.js";

const setupSocket = (server) => {
    const io = new SocketIoServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        },
    })

    const userSocketMap = new Map();


    const disconnect = (socket) => {
        console.log(`Client Disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }

    };


    const sendMessage =async(message)=>{
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);
          // Create the message
        const createdMessage = await Message.create(message);

          // Finding the created message by its ID and populate sender and recipient details
        const messageData =await Message.findById(createdMessage._id)
        .populate("sender","id email firstName lastName image color")
        .populate("recipient","id email firstName lastName image color")
        .exec();

        if(recipientSocketId){
            io.to(recipientSocketId).emit("recieveMessage",messageData);
        }

        //confirmation message to sender
        if(senderSocketId){
            io.to(senderSocketId).emit("recieveMessage",messageData);
        }

    }

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
        }
        else {
            console.log("User ID not provided during connection.");
        }

        socket.on("sendMessage",sendMessage );
        socket.on("disconnect", () => disconnect(socket));
    });


};


export default setupSocket;
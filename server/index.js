import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import AuthRoutes from "./routes/AuthRoutes.js"
import contactsRoutes from "./routes/ContactRoutes.js"
import setupSocket from "./socket.js"
import messagesRoutes from "./routes/MessagesRoutes.js"

dotenv.config();

const app= express();
const port =process.env.PORT || 3000;
const databaseurl =process.env.DATABASE_URL;

app.use(cors({
    origin:process.env.ORIGIN,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true, //we have to write this enable cookies
}));

app.use('/upload/profiles',express.static("upload/profiles"));
app.use('/upload/files',express.static("upload/files"));


app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',AuthRoutes);
app.use('/api/contacts',contactsRoutes);
app.use("/api/messages", messagesRoutes);



const server = app.listen(port,()=>{
    console.log(`server started at  port : ${port}`);
})

setupSocket(server);


//CONNECTING THE DATABASE
mongoose.connect(databaseurl).then(()=>{console.log("database connection successfull")}).catch((error)=>{console.log("error found :",error.message)});
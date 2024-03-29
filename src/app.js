import express from "express";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import mongoose from "mongoose";


import productRouter from "./routes/prducts.router.js";
import cartRouter from "./routes/carts.routers.js";
import viewRouter from "./routes/views.router.js";
import messagesModel from "./daos/models/messages.model.js"; 
import __dirname from "./utils.js";


// instancia de servidor//
const app = express();
const server = app.listen(8080, ()=>console.log("servidor activo en http://localhost:8080/"));
const io = new Server(server);

//coneccion a base mongoDb//
mongoose.connect("mongodb+srv://guntherScherzer:gunther150397@backendproyectofinal.wbo1qc7.mongodb.net/?retryWrites=true&w=majority", error=>{
    if (error) {
       console.log("error en conexion:",error);
       process.exit();
    
}
})

//Configutacion del server//
app.engine("handlebars", handlebars.engine());

app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

//Declaracion de Midlewares propios//
const addWebsocket = (req, res, next)=>{
    req.io = io;
    next();
}


//ChatLogica//
io.on("connection",socket=>{
    console.log("se conecto un wachin");

    socket.on("message",async (data)=>{
        await messagesModel.create(data);  

        let messages = await messagesModel.find();
        io.emit("messageLogs", messages);
    })
})

//Midlewares//
app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(addWebsocket);

//Rutas//
app.use("/", viewRouter);
app.use("/api/products/",productRouter);
app.use("/api/carts", cartRouter);



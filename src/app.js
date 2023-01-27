import express from "express";
import handlebars from "express-handlebars";
import {Server} from "socket.io";

import productRouter from "./routes/prducts.router.js";
import cartRouter from "./routes/carts.routers.js";
import viewRouter from "./routes/views.router.js";
import __dirname from "./utils.js";


// instancia de servidor//
const app = express();
const server = app.listen(8080, ()=>console.log("servidor activo en http://localhost:8080/"));
const io = new Server(server);

//Configutacion del server//
app.engine("handlebars", handlebars.engine());

app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

//Declaracion de Midlewares propios//
const addWebsocket = (req, res, next)=>{
    req.io = io;
    next();
}

//Midlewares//
app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(addWebsocket);

//Rutas//
app.use("/", viewRouter);
app.use("/api/products/",productRouter);
app.use("/api/carts", cartRouter);


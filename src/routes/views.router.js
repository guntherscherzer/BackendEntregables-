import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import __dirname from "../utils.js";

const viewRouter = Router();
const productManager = new ProductManager(__dirname+"/db/product.json");

viewRouter.get("/",(req,res)=>{
    let products = productManager.getProducts();
    
    res.render("home",{products});
})
viewRouter.get("/realtimeproducts", (req,res)=>{
    let products = productManager.getProducts();
    
    req.io.on('connection', socket=>{
        console.log("Cliente conectado");
    })

    res.render("realTimeProducts",{products});
})

export default viewRouter;
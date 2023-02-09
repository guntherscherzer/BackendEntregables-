import { Router } from "express";
import ProductManager from "../daos/ProductManager.js";
import __dirname from "../utils.js";
import ProductDb from "../daos/product.db.js";


const viewRouter = Router();
const productDb = new ProductDb(__dirname+"/db/product.json");

viewRouter.get("/",async (req,res)=>{
    let products = await productDb.getProducts().lean();
    
    res.render("home",{products});
})
viewRouter.get("/realtimeproducts", async (req,res)=>{
    let products = await productDb.getProducts().lean();
    
    req.io.on('connection', socket=>{
        console.log("Cliente conectado");
    })

    res.render("realTimeProducts",{products});
})

viewRouter.get("/chat",(req,res)=>{
    res.render("chat",{})
})
export default viewRouter;
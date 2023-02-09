import { Router } from "express";
import CartManager from "../daos/CartManager.js";
import __dirname from "../utils.js";
import CartDb from "../daos/cart.db.js"

const cartRouter = Router();
const cartManager = new CartManager(__dirname+"/db/cart.json");
const cartDb = new CartDb();

cartRouter.get("/:cid",(req,res)=>{
    try {
        let cid = req.params.cid;
        let cart = cartDb.getCartById(cid)
    
        res.send({status:"success" ,paylode:cart.products});
        
    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
})

cartRouter.post("/",(req,res)=>{
    try {
        let addCart = req.body.products;
        
        cartDb.addCart(addCart);
        res.send({status:"success", message:"Carrito cargado con exito"});
        
    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
});
cartRouter.post("/:cid/product/:pid",(req,res)=>{
    try {
        let pid = req.params.pid;
        let cid = req.params.cid;
        cartDb.addProductToCart(cid,pid);
        res.send({status:"success", message:"producto agregado al carrito con exito"});

    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
})



export default cartRouter;
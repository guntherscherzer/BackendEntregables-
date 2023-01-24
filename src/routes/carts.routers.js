import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
import __dirname from "../utils.js";

const cartRouter = Router();
const cartManager = new CartManager(__dirname+"/db/cart.json");


cartRouter.get("/:cid",(req,res)=>{
    try {
        let cid = Number(req.params.cid);
        let cart = cartManager.getCartById(cid)
    
        res.send({status:"success" ,paylode:cart.products});
        
    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
})

cartRouter.post("/",(req,res)=>{
    try {
        let addCart = req.body.products;
        
        cartManager.addCart(addCart);
        res.send({status:"success", message:"Carrito cargado con exito"});
        
    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
});
cartRouter.post("/:cid/product/:pid",(req,res)=>{
    try {
        let pid = Number(req.params.pid);
        let cid = Number(req.params.cid);
        cartManager.addProductToCart(cid,pid);
        res.send({status:"success", message:"producto agregado al carrito con exito"});

    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
})



export default cartRouter;
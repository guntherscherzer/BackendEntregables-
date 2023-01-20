import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
import __dirname from "../utils.js";

const cartRouter = Router();
const CartManager = new CartManager(__dirname+"/db/cart.json");

cartRouter.get("/",(req,res)=>{
    res.send();
})
crartRouter.get("/:cid",(req,res)=>{
    let cid = Number(req.params.cid);
    let cart = cartManager.getCartById(cid)

    res.send({cart.products});
})

cartRouter.post("/",(req,res)=>{
    try {
        let addCart = req.body;
        
        cartManager.cartAdd(addCart);
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
import { Router } from "express";
import ProductManager from "../models/ProductManager.js";
import __dirname from "../utils.js";


const productManager = new ProductManager(__dirname+"/db/product.json");
const productRouter = Router();


productRouter.get("/",(req,res)=>{
    let products = productManager.getProducts();
    let limit = req.query.limit || products.length;

  
    res.send({products:products.splice(0,limit)});
})

productRouter.get("/:pid",(req,res)=>{
    let pid = Number(req.params.pid);
    let product = productManager.getProductById(pid)

    res.send({product});
})

productRouter.post("/",(req,res)=>{
   try {
       let productAdd = req.body;
       
       productManager.addProducts(productAdd);
       res.send({status:"success", message:"Producto cargado con exito"});
       
   } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
   }
})

productRouter.put("/:pid",(req,res)=>{
    try {
        let pid = Number(req.params.pid);
        let productUpdate = req.body;
        productManager.updateProduct(pid,productUpdate);
        res.send({status:"success", message:"Producto actualizado con exito"});

    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
})

productRouter.delete("/:pid",(req,res)=>{
    try {
        let pid = Number(req.params.pid);
        productManager.deleteProduct(pid);
        res.send({status:"success", message:"Producto eliminado con exito"});
    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
})
export default productRouter;
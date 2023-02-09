import { Router } from "express";
import ProductManager from "../daos/ProductManager.js";
import __dirname from "../utils.js";
import ProductDb from "../daos/product.db.js";


const productManager = new ProductManager(__dirname+"/db/product.json");
const productRouter = Router();
const productDb = new ProductDb();


productRouter.get("/",(req,res)=>{
    try {
        let products = productDb.getProducts();
        let limit = req.query.limit || products.length;
        
        res.send({products:products.splice(0,limit)});
    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
  
})

productRouter.get("/:pid",(req,res)=>{
    try {
        let pid = Number(req.params.pid);
        let product = productDb.getProductById(pid)
    
        res.send({product});
        
    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
})

productRouter.post("/", async (req,res)=>{
   try {
       let productAdd = req.body;

       console.log(productAdd);
       
       await productDb.addProducts(productAdd);

       let products = productDb.getProducts();
       req.io.sockets.emit('updateProducts', products);

       res.send({status:"success", message:"Producto cargado con exito"});
   } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
   }
})

productRouter.put("/:pid",(req,res)=>{
    try {
        let pid = req.params.pid;
        let productUpdate = req.body;

        productDb.updateProduct(pid,productUpdate);

        let products = productDb.getProducts();
        req.io.sockets.emit('updateProducts', products);
        
        res.send({status:"success", message:"Producto actualizado con exito"});

    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
})

productRouter.delete("/:pid",(req,res)=>{
    try {
        let pid = req.params.pid;

        productDb.deleteProduct(pid);

        let products = productDb.getProducts();
        req.io.sockets.emit('updateProducts', products);

        res.send({status:"success", message:"Producto eliminado con exito"});
    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
})
export default productRouter;
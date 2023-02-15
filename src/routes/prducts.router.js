import { Router } from "express";
import ProductManager from "../daos/ProductManager.js";
import __dirname from "../utils.js";
import ProductDb from "../daos/product.db.js";


const productManager = new ProductManager(__dirname+"/db/product.json");
const productRouter = Router();
const productDb = new ProductDb();


productRouter.get("/",async (req,res)=>{
    try {
        let products = await productDb.getProducts();
        let limit = req.query.limit || products.length;
        
        res.send({products:products.splice(0,limit)});
    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
  
})

productRouter.get("/:pid",async (req,res)=>{
    try {
        let pid = Number(req.params.pid);
        let product = await  productDb.getProductById(pid)
    
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

       let products = await productDb.getProducts();
       req.io.sockets.emit('updateProducts', products);

       res.send({status:"success", message:"Producto cargado con exito"});
   } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
   }
})

productRouter.put("/:pid",async(req,res)=>{
    try {
        let pid = req.params.pid;
        let productUpdate = req.body;

        await productDb.updateProduct(pid,productUpdate);

        let products = await productDb.getProducts();
        req.io.sockets.emit('updateProducts', products);
        
        res.send({status:"success", message:"Producto actualizado con exito"});

    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
})

productRouter.delete("/:pid",async(req,res)=>{
    try {
        let pid = req.params.pid;

        await productDb.deleteProduct(pid);

        let products = await productDb.getProducts();
        req.io.sockets.emit('updateProducts', products);

        res.send({status:"success", message:"Producto eliminado con exito"});
    } catch (error) {
        console.log(error);
        res.send({status:"error", message:error.message});
    }
})
export default productRouter;
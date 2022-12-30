import express from "express";
import __dirname from "./utils.js";
import ProductManager from "./models/ProductManager.js";
const app = express();
const productManager = new ProductManager(__dirname+"/db/product.json");

app.use(express.urlencoded({extended:true}));

app.get(`/products`,(req,res)=>{
   let products = productManager.getProducts();
   let limit = req.query.limit || products.length;

  
   res.send({products:products.splice(0,limit)});
})

app.get(`/products/:pid`,(req,res)=>{
    let pid = Number(req.params.pid);
    let product = productManager.getProductById(pid)

    res.send({product});
})

app.listen(8080, ()=>console.log("servidor activo en http://localhost:8080/"))
import express from "express";
import productRouter from "./routes/prducts.router.js";
import cartRouter from "./routes/carts.routers.js";

const app = express();

app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products/",productRouter);
app.use("/api/carts", cartRouter);


app.listen(8080, ()=>console.log("servidor activo en http://localhost:8080/"));
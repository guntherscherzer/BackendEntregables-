import mongoose from "mongoose";


const productCollection = "productos";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnails: [String],
    code: String,
    stock: Number
})

const productModel = mongoose.model(productCollection,productSchema);

export default productModel
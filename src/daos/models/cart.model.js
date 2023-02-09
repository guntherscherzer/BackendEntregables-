import mongoose from "mongoose";


const cartCollection = "carritos";

const cartSchema = new mongoose.Schema({
    products:[{
        product:String,
        quantity: Number
    }]
})

const cartModel = mongoose.model(cartCollection,cartSchema);

export default cartModel
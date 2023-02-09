import mongoose from "mongoose";


const messagesCollection = "mensajes";

const messagesSchema = new mongoose.Schema({
    products:[{
        user:String,
        message: String
    }]
})

const messagesModel = mongoose.model(messagesCollection,messagesSchema);

export default messagesModel
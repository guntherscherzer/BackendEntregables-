import cartModel from "./models/cart.model.js";

class CartDb{
    constructor(){}
    
    addCart(products){
        return cartModel.create({products});
    }
    getCartById(id){
        return cartModel.findById(id);
    }

    addProductToCart(cartId,productId){
       
        let cart =cartModel.findById(cartId).lean();
        
        let product = cart.products.find(product=>product.product === productId );
        
        if (!!!product) {
            cart.products.push({product:productId,quantity:1})
        }else{
            
            let productIndex = cart.products.indexOf(product)
            cart.products[productIndex].quantity++
        }
        return cartModel.updateOne({_id:cartId},{products:cart.products});  
    }
}

export default CartDb;
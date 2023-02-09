import productModel from "./models/product.model.js";

class ProductDb{
     constructor(){}
    
    getProducts(){
        return productModel.find();
    }
    addProducts(product){
     return productModel.create(product);
    }
    
    getProductById(id){
       return productModel.findById(id);
    } 
    updateProduct(id,data){
        return productModel.updateOne({_id:id},data);
    }
    deleteProduct(id){
        return productModel.deleteOne({_id:id});
    }

}

export default ProductDb;
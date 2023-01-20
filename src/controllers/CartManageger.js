import fs from 'fs';

class CartManager{
    constructor(path){
        this.path = path;
        this.lastId= 0;
        this.carts = []
    }
    readFile() {
        return JSON.parse(fs.readFileSync( this.path, `utf-8`));
    }
    writeFile(){
        return fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    }
    
    loadFile(){
        this.carts = this.readFile() || [];

        let idAct = 0;
        this.carts.forEach(cart=>{
            if(cart.id > idAct) idAct=cart.id;
        })
        this.lastId= idAct+1;
    }

    addCart(products){
        this.carts.push({id:this.lastId, products});
        this.lastId++;
        this.writeFile();
    }
    getCartById(id){
        let carts = this.readFile();
        const cart = carts.find(cart=>cart.id === id);
        if(!!cart){
            return(cart);
        }else{    
            throw new Error(`El carrito no fue encontrado`);
            
        }
    }

    addProductToCart(cartId,productId){
        let cart = getCartById(cartId);
        let product = cart.products.find(products=>product.id === productId );

        let cartIndex = this.carts.indexOf(cart);
        
        if (!!!product) {
            this.carts[cartIndex].products.push({product:productId,quantity:1})
        }else{

            let productIndex = cart.products.indexOf(product)
            this.carts[cartIndex].products[productIndex].quantity++
        }
    }
}

export default CartManager;
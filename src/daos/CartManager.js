import fs from 'fs';

class CartManager{
    constructor(path){
        this.path = path;
        this.lastId= 0;
        this.carts = []
        this.loadFile();
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
            if(cart.id >= idAct) idAct=cart.id+1;
        })
        this.lastId= idAct;
    }

    addCart(products){
        this.carts.push({id:this.lastId, products});
        this.lastId++;
        this.writeFile();
    }
    getCartById(id){
        let carts = this.carts;
        const cart = carts.find(cart=>cart.id === id);
        if(!!cart){
            return(cart);
        }else{    
            throw new Error(`El carrito no fue encontrado`);
            
        }
    }

    addProductToCart(cartId,productId){
       
        let cart =this.getCartById(cartId);
        console.log(cart);
        let product = cart.products.find(product=>product.product === productId );

        let cartIndex = this.carts.indexOf(cart);

        console.log("errroorde prueba",cart,this.carts,cartIndex,this.carts[cartIndex]);
        
        if (!!!product) {
            this.carts[cartIndex].products.push({product:productId,quantity:1})
        }else{

            let productIndex = cart.products.indexOf(product)
            this.carts[cartIndex].products[productIndex].quantity++
        }
        this.writeFile();
    }
}

export default CartManager;
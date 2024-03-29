import fs from 'fs';

class ProductManager{
     constructor(path){
         this.path = path
         this.lastId= 0;
         this.products=[];

         this.loadFile();
     }
    
    loadFile(){
        this.products = this.readFile() || [];

        let idAct = 0;
        this.products.forEach(prod=>{
            if(prod.id > idAct) idAct=prod.id;
        })
        this.lastId= idAct+1;
    }
     
    readFile() {
        return JSON.parse(fs.readFileSync( this.path, `utf-8`));
    }
    writeFile(){
        return fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }
    getProducts(){
        return this.readFile();
    }
    addProducts(product){
        if(this.products.some(prod=>prod.code === product.code)){
            throw new Error(`El codigo del producto ya existe`);
        }
        if (!!!product.title || !!!product.description || !!!product.price  || !!!product.code || !!!product.stock) {
            throw new Error(`Todos los campos deben ser completados`);
        }
        if (!!! product.status) {
            product.status= true
        }
        this.products.push({id:this.lastId, ...product});
        this.lastId++;
        this.writeFile();
    }
    
    getProductById(id){
        let products = this.readFile();
        const product = products.find(product=>product.id === id);
        if(!!product){
            return(product);
        }else{    
            throw new Error(`El producto no fue encontrado`);
            
        }
    } 
    updateProduct(id,data){
        let products = this.readFile();
        const product = products.find(product=>product.id === id );
        if(!!product){
            data.id = id;
            let productIndex = products.indexOf(product);

            this.products[productIndex]={...product, ...data};
            this.writeFile();
        }else{    
            throw new Error(`El producto no fue encontrado`);
            
        }
    }
    deleteProduct(id){
        let products = this.readFile();
        const product = products.find(product=>product.id === id );
        if (!!product) {
            let productIndex = products.indexOf(product);

            this.products.splice(productIndex,1);
            this.writeFile();
        }else{
            throw new Error(`El producto no fue encontrado`);
        }
    }

}

export default ProductManager;
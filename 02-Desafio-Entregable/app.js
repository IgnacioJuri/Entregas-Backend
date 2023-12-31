const { log } = require('console');
const fs = require('fs');

class ProductManager {
    //CORRECCION
    //constructor(){
    constructor(path){
        //CORRECCION
        //this.path = "./productos.json";
        this.path = path;
        this.lastId = 0;
    };

    async getProducts(){

        try {
            if(fs.existsSync(this.path)){

                const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
                const productsJS = JSON.parse(productsJSON);
                return productsJS;

            }else return [];

        } catch (error) {
            console.error(error);
        }
    };
    //CORRECCION
    //async addProducts(product){
    async createProduct(product){

        try {
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            
        } catch (error) {
            console.error(error);
        }
    };
    //CORRECCION
    //async createProduct (title, description, price, thumbnail, code, stock){
    async addProduct  (title, description, price, thumbnail, code, stock){
        const product = {
            id: this.#getUniqueId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.error("Todos los campos deben ser completados");
            return;
        }

        const products = await this.getProducts();
        
        if(products.find(prod => prod.code === code)){
            console.error(`El producto con este codigo: ${code} , ya existe`);
            return;
        } else {
            await this.createProduct(product);
        };
    };

    #getUniqueId(){
        this.lastId++; 
        return this.lastId; 
    };

    async getProductById(IdProduct){
        try {
            const products = await this.getProducts();
            const productById =  products.find(product => product.id === IdProduct);
            if(productById === undefined){
                return console.error(`No existe ningun producto con Id ${IdProduct}`);
            }else{
                return productById;
            };
        } catch (error) {
            console.error(error);
        };
    };

    async deleteProduct(IdProduct) {
        try {
            const products = await this.getProducts();
            const updatedProducts = products.filter(product => product.id !== IdProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
        } catch (error) {
            console.error(error);
        }
    };

    async updateProduct(id, updatedFields) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex !== -1) {
                updatedFields.id = id;
                products[productIndex] = updatedFields;
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                console.log("Producto actualizado correctamente.");
            };
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        };
    };
};



// CORRECCION
//const productManager = new ProductManager();
const productManager = new ProductManager("./Productos.json");

const test = async() => {
    await productManager.addProduct("PRODUCTO 1", "asdasasd", 25, "algo.jpg", 5, 2);
    await productManager.addProduct("PRODUCTO 2", "asdasasd", 25, "algo.jpg", 25, 2);
};

test();

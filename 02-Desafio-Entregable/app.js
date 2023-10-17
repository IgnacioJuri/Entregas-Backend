const fs = require('fs');

class ProductManager {
    constructor(){
        this.path = "./products.json";
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

    async addProducts(product){

        try {
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            
        } catch (error) {
            console.error(error);
        }
    };

    async createProduct (title, description, price, thumbnail, code, stock){
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
            await this.addProducts(product);
        };
    };

    #getUniqueId(){
        this.lastId++; // Incrementa el último ID asignado
        return this.lastId; // Devuelve el nuevo ID
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




const productManager = new ProductManager();

const test = async() => {
    
};

test();
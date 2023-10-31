
import fs from 'fs';

export class ProductManager {
    constructor(path){
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
            throw new Error('Error al cargar los productos');
        }
    };
    async createProduct(product){

        try {
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            
        } catch (error) {
            throw new Error('Error al crear un nuevo producto');
        }
    };
    async addProduct  (title, description, price, thumbnail, code, stock){
        const product = {
            id: this.#getUniqueId(),
            status: true,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        // if(!title || !description || !price || !thumbnail || !code || !stock){
        //     throw new Error("Todos los campos deben ser completados");
        // }

        const products = await this.getProducts();
        
        if(products.find(prod => prod.code === code)){
            throw new Error(`El producto con este codigo: ${code} , ya existe`);
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
                throw new Error(`No existe ningun producto con Id ${IdProduct}`);
            }else{
                return productById;
            };
        } catch (error) {
            throw new Error('Error al Buscar producto por ID');
        };
    };

    async deleteProduct(IdProduct) {
        try {
            const products = await this.getProducts();
            const updatedProducts = products.filter(product => product.id !== IdProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
        } catch (error) {
            throw new Error(`Error al Borrar producto con el ID ${IdProduct}`);
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
            throw new Error("Error al actualizar el producto:", error);
        };
    };
};

const productManager = new ProductManager("./Productos.json");

const test = async() => {
    
};

test();
import fs from 'fs';

export class CartManager {
    constructor(path){
        this.path = path;
        this.lastId = 0;
    };

    async getCart(){
        try {
            if(fs.existsSync(this.path)){
                const cartJSON = await fs.promises.readFile(this.path, 'utf-8');
                const cartJS = JSON.parse(cartJSON);
                return cartJS;
            }else return [];
        } catch (error) {
            throw new Error('Error al cargar el carrito');
        }
    };

    async createCart(object){
        try {
            const carts = await this.getCart();
            carts.push(object);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));

        } catch (error) {
            throw new Error('Error al crear un nuevo carrito');
        }
    };

    async newCart(){

        const cart = {
            id: this.#getUniqueId(),
            products: []
        };

        await this.createCart(cart);
        return;
    };

    #getUniqueId(){
        this.lastId++; 
        return this.lastId; 
    };

    async getCartById(id) {
        try {
            const carts = await this.getCart();
            const cart = carts.find(cart => cart.id === id);
            if(!cart) return false;
            return cart;
        } catch (error) {
            throw new Error(error);
        }
      }

      async saveProductToCart(idCart, idProd){
        const carts = await this.getCart();
        const cartExists = await this.getCartById(idCart);
        if(cartExists){
            const existProdInCart = cartExists.products.find(product => product.id === idProd);
            if(existProdInCart) existProdInCart.quantity += 1
            else {
                const prod = {
                    product: idProd,
                    quantity: 1
                };
                cartExists.products.push(prod);
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cartExists;
        }
      }

};

const cartManager = new CartManager("./Carrito.json");

const test = async() => {
    
};

test();
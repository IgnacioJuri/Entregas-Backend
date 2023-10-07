class ProductManager{
    constructor (){
        this.products = [];
    };

    addProduct(title, description, price, thumbnail, code, stock){
        const producto = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Todos los campos deben ser completados");
            return;
        }

        if(this.products.find(product => product.code === code)){
            console.log(`El producto con este codigo: ${code} , ya existe`);
            return;
        }else{
            this.products.push(producto); 
        }
    };

    #getMaxId(){
        let maxId = 0;
        this.products.map((event)=>{
            if(event.id > maxId) maxId = event.id;
        })
        return maxId;
    };

    getProducts(){
        return this.products;
    }

    getProductById(IdProduct){
        return this.products.find(product => product.id === IdProduct)
    }
};

const productManager = new ProductManager();

productManager.addProduct("Pan", "Pan Lactal", 1000, "./img/pan/panlactal.jpg", 800, 50);
productManager.addProduct("Leche", "Leche Descremada", 600, "./img/leche/lechedescremada.jpg", 345, 10);
productManager.addProduct("Huevos", "Huevos de campo", 2300, "./img/huevo/huevosdecampo.jpg", 182, 3);
productManager.addProduct("Manzana", "Manzana Verde", 300, "./img/manzana/manzanaverde.jpg", 9856, 25);

console.log("Estos son todos los productos");
console.log(productManager.getProducts());

console.log("Este es el producto que buscas por ID");
console.log(productManager.getProductById(2));

console.log("Este es un error por que dos productos tienen el mismo Code");
productManager.addProduct("Banan", "Banana de Ecuador", 1200, "./img/banana/bananaecuador.jpg", 9856, 8);
console.log(productManager.getProducts());





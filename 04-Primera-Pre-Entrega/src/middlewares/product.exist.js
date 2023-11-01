import { ProductManager } from '../managers/product.manager.js';

const productManager = new ProductManager('./src/data/Productos.json');

export const productExist = async (req, res, next) =>{

    const products = await productManager.getProducts();
    const { cid } = req.params;
    const { pid } = req.params;
    const findProduct = products.find(product => product.id === Number(pid));

    if(!findProduct){

        res.status(404).json({ msg: `No existe el product con el id ${pid}`});

    }else next();    
};

import { Router } from 'express';
import { ProductManager } from '../managers/product.manager.js';


const router = Router();
const productManager = new ProductManager("./src/data/Productos.json");

router.get('/home', async (req, res) => {
    try{

        const products = await productManager.getProducts()
        res.render('home', { products: products })

    } catch(error){
        res.render('error', { error: error })
    }
});

router.get('/home', async (req, res) => {
    
    try {
        
    } catch (error) {
        
    }
});

export default router;
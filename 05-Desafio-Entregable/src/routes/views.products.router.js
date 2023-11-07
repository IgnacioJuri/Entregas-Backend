import { Router } from 'express';
import { ProductManager } from '../managers/product.manager.js';
import { io } from '../server.js';


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

router.get('/realtimeproducts', async (req, res) => {
    try{
        const products = await productManager.getProducts()
        
        io.on('connection', (socket) => {
            io.emit('products', products)

            socket.on('addProduct', async (product) => {
                if(!product) return
                
                const { title, description, price, thumbnail, code, stock } = product

                await productManager.addProduct(title, description, price, thumbnail, code, stock)
                const updatedProducts = await productManager.getProducts()

                io.emit('products', updatedProducts)
            })

        })
        res.render('realTimeProducts')
    } catch(error){
        res.render('error', { error: error })
    }
})


export default router;
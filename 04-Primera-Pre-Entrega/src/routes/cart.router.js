import { Router } from 'express';
import { CartManager } from '../managers/cart.manager.js';
const router = Router();
const cartManager = new CartManager("./src/data/Cart.json");

router.get('/', async (req,res) => {

    try {
        const cart = await cartManager.getCart();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});

router.get('/:cid' , async (req,res) => {

    try {
        const { cid } = req.params;
        const getCartById = await cartManager.getCartById(Number(cid));
        res.status(200).json(getCartById);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req,res) => {

    try {
        await cartManager.newCart();
        res.status(200).json({ message: 'Carrito creado' })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:cid/product/:pid', async (req,res) =>{

    try {
        const { cid } = req.params;
        const { pid } = req.params;
        await cartManager.saveProductToCart(cid,pid);
        res.status(200).json({message: `Producto guardado en carrito ${cid} `});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




export default router;
import { Router } from 'express';
import { ProductManager } from '../managers/product.manager.js';
import { productValidator } from '../middlewares/product.validator.js';
const router = Router();
const productManager = new ProductManager("./src/data/Productos.json");


router.get('/' , async (req,res) =>{

    try {
        const products = await productManager.getProducts();
        const {limit} = req.query;
        if(limit){
            res.status(200).json(products.slice(0, parseInt(limit)));
        }else{
            res.status(200).json(products);
        };
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});

router.get('/:pid', async (req, res) => {

    const { pid } = req.params;
    const pidNumber = Number(pid)
    
    try {
      const product = await productManager.getProductById(pidNumber);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post('/', productValidator, async (req,res) => {

    try {
        const productCreated = await productManager.addProduct(req.body);
        res.status(200).json(productCreated);
      } catch (error) {
        res.status(500).json(error.message);
      }
});

router.put("/:id", async (req, res) => {
    try {
      const product = { ...req.body };
      const { id } = req.params;
      const idNumber = Number(id);
      const productOk = await productManager.getProductById(idNumber);
      if (!productOk) res.status(404).json({ message: "product not found" });
      else await productManager.updateProduct(product, idNumber);
      res.status(200).json({ message: `product id: ${id} updated` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });


router.delete('/:pid', async (req,res) => {
    const { pid } = req.params;
    try {
        await productManager.deleteProduct(Number(pid));
        res.status(200).json({message: `product ${pid} deleted`})
    } catch (error) {
        res.status(500).json(error.message);
    }
});

export default router;
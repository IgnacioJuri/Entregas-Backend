import express from 'express';
import { ProductManager } from './ProductManager.js';

const app = express();
const productManager = new ProductManager("./Productos.json");
const PORT = 8080

app.get("/products", async (req, res) => {
    const {limit} = req.query;

    try {
        const products = await productManager.getProducts();
       
        if(limit){
            res.json(products.slice(0, parseInt(limit)));
        }else{
            res.json(products);
        };
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});

app.get('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  const pidNumber = Number(pid)
  
  try {
    const product = await productManager.getProductById(pidNumber);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));

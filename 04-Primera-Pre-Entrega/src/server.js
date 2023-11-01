import express from 'express';
import productRout from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));


app.use('/api/products', productRout );
app.use('/api/cart', cartRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));

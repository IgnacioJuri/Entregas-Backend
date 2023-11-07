import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productRout from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewRouter from './routes/views.products.router.js';

const app = express();

app.use(express.json());
app.use(express.static("/public"));


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set('views', './src/views');

const httpServer = app.listen(8080, () => {
    console.log("Server ok on port 8080");
});

const io = new Server(httpServer);

io.on('connection', () => console.log('new client connection'));


app.use('/api/products', productRout );
app.use('/api/cart', cartRouter);
app.use('/', viewRouter);
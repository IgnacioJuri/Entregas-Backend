import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productRout from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewRouter from './routes/views.products.router.js';

const app = express();

app.use(express.json());
app.use(express.static("./src/public"));


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set('views', './src/views');

const httpServer = app.listen(8080, () => {
    console.log("Server ok on port 8080");
});

app.use('/api/products', productRout );
app.use('/api/cart', cartRouter);
app.use('/', viewRouter);

export const io = new Server(httpServer);
app.set("socketio", io);

io.on("connection", socket => {
    console.log("Successful Connection")
    // socket.on("productList", data => {
    //   io.emit("updatedProducts", data)
    // })
  });
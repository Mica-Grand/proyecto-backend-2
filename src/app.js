import express from "express";
import mongoose from'mongoose'
import handlebars from 'express-handlebars'
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import __dirname from './utils/utils.js'
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import productModel from './models/product.model.js';



const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

//mongoose
const environment = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://el12del8:Ramiro20@codertest.jek84kt.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=CoderTest"
    );
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error while connecting to database", err);
  }
};
environment();
//Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars')


//Routes
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

//http server
const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//websocket
const socketServer = new Server(httpServer, {
});

socketServer.on('connection', socket => {
    console.log('New client connected'); 

    socket.on('addProduct', async (productData) => {
        try {
            if (!productData.thumbnails) {
                productData.thumbnails = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
            }
            //agrego producto usando productManager

            const succesfullyAdded = await productModel.create(title, description, code, price, stock, category, thumbnails, status);
            if (succesfullyAdded) {
                console.log('Producto newProductAdded:', productData)
                const updatedProductList = await productManager.getProducts();
                //emito el evento  con la lista actualizada

                socketServer.emit('productListUpdated', updatedProductList);
            }
        } catch (error) {
            console.error('Error while adding the product:', error)
        }
    });

    //escucho el evento que pide eliminar producto y lo elimino usando productManager
    socket.on('deleteProduct', async (productId) => {
        try {
            console.log('Intentando eliminar producto con ID:', productId); 
            const succesfullyDeleted = await productManager.deleteProduct(parseInt(productId));
            console.log(succesfullyDeleted)
            if (succesfullyDeleted) {
                console.log('Producto eliminado:', productId)
                socketServer.emit('productDeleted', productId)
            }
        } catch (error) {
            console.error('Error while deleting the product:', error)
        }
    });  
})



           
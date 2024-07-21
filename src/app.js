import express from "express";
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import __dirname from './utils/utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import {productManager} from "./managers/managers.js";

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

//Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars')


app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
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

            const succesfullyAdded = await productManager.addProduct(productData.title, productData.description, productData.code, productData.price, productData.stock, productData.category, productData.thumbnails);
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



           
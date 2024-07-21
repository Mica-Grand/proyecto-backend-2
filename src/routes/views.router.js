

import express from 'express';
import {productManager} from '../managers/managers.js';

const router = express.Router();

router.get('/realtimeproducts', async (_, res) => {
    try {

        const products = await productManager.getProducts();

        const productsData = products.map(product => ({
            id: product.id,
            title: product.title,
            thumbnails: product.thumbnails,
            description: product.description,
            price: product.price,
            stock: product.stock,
            code: product.code
        }));

       
        res.render('realTimeProducts', {
            title: 'Productos en tiempo real',
            products: productsData,
        });
    } catch (error) {
        console.error("We can't show the products right now", error);
        res.status(500).send('Error while loading the products');
    }
});

router.get('/', async (_, res) => {
    try {

        const products = await productManager.getProducts();

        const productsData = products.map(product => ({
            id: product.id,
            title: product.title,
            thumbnails: product.thumbnails,
            description: product.description,
            price: product.price,
            stock: product.stock,
            code: product.code
        }));

       
        res.render('home', {
            title: 'Productos',
            products: productsData,
        });
    } catch (error) {
        console.error("We can't show the products right now", error);
        res.status(500).send('Error while loading the products');
    }
});


export default router;


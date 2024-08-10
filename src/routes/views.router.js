

import express from 'express';
import productModel from '../models/product.model.js';
import cartModel from '../models/cart.model.js';



const router = express.Router();

router.get('/realtimeproducts', async (_, res) => {
    try {

        const products = await productModel.getProducts();

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

router.get('/products', async (req, res) => {
    let { limit, page, sort, query } = req.query;
  if (!page) page = 1;
  if (!limit) limit = 10;

  let filter = {};
  if (query) {
    filter = { $or: [{ category: query }, { status: query }] };
  }

  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
    lean:true
  };
  try {
    const result = await productModel.paginate(filter, options);
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)
        res.render('index', {
            title: 'Productos',
            products: result.docs,
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink,
            nextLink: result.nextLink
    
        });
    } catch (error) {
        console.error("We can't show the products right now", error);
        res.status(500).send('Error while loading the products');
    }
});


export default router;




import express from 'express';
import productModel from '../models/product.model.js';
import cartModel from '../models/cart.model.js';



const router = express.Router();

router.get('/realtimeproducts', async (req, res) => {
    try {

        let result = await productModel.find();
       
        res.render('realTimeProducts',  {
            products: result.docs,
            title: 'Real time products',
            useWS: true,
            scripts: ['realtime.js'],
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

  if (query === 'undefined') query = '';
  if (query) {
    const isBoolean = query.toLowerCase() === 'true' || query.toLowerCase() === 'false';

    if (isBoolean) {
      filter = { status: query.toLowerCase() === 'true' };
    } else {
      filter = { category: query };
    }
  }


  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
    lean:true
  };
  try {
    const result = await productModel.paginate(filter, options);
    result.prevLink = result.hasPrevPage ? `?page=${result.prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
    result.nextLink = result.hasNextPage ? `?page=${result.nextPage}&limit=${limit}&sort=${sort}&query=${query}` : null
    result.isValid = !(page <= 0 || page > result.totalPages)
        res.render('index', {
            title: 'Products',
            products: result.docs,
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink,
            nextLink: result.nextLink,
            isValid: result.isValid,
            scripts: ['index.js']


    
        });
    } catch (error) {
        console.error("We can't show the products right now", error);
        res.status(500).send('Error while loading the products');
    }
});

router.get('/cart/:cid', async (req, res) => {
    const { cid } = req.params;
    //por el momento estoy haciendo pruebas con cart id: 66affd4bc723a31ad3519e85 hardcodeado en la lógica del botón de agregar al carrito
    try {
        let result = await cartModel.findOne({_id:cid}).populate('products.productId').lean();
        if (!result) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        let cartLength = result.products.length 
        let emptyCart = cartLength === 0;

        res.render('cart', { 
            title: 'Cart',
            cart: result.products,
            emptyCart,
            scripts: ['cart.js']
        });
    } catch (error) {
        console.error('Error getting cart by ID:', error);
        res.status(500).json({ error: 'cart not found' });
    }
   
  })


  



export default router;


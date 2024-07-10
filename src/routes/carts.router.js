import {Router} from 'express';
import { cartManager } from '../managers/managers.js';

const router = Router();


router.post('/', async (_req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.error('Error while creating a new cart: ', error);
        res.status(500).json({ error: 'Server internal error' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cartId);
        if (!cart) {
        return res.status(404).json({ error: `The cart with id ${cartId} does not exist` });
        }
        const cartProducts = cart.products;
        res.json(cartProducts);
    } catch (error) {
        console.error('Error while retrieving the cart:', error);
        res.status(500).json({ error: 'Server internal error' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = 1;

        const added = await cartManager.addProductToCart(cartId, productId, quantity);
        if (added) {
            res.json({ message: `The product with ID ${productId} has been succesfully added to the cart` });
        } else {
            return res.status(404).json({ error: `The cart with id ${cartId} does not exist` });
        }
    } catch (error) {
        console.error('Error while adding  a product to the cart:', error);
        if (error.message.includes('Product with ID')) {
            return res.status(404).json({ error: error.message });
        } else if (error.message.includes('Cart with ID')) {
            return res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Server Internal error' });
        }
    }
});

export default router;
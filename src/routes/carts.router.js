import {Router} from 'express';
import CartManager from '../managers/cartManager.js';

const router = Router();

const cartManager = new CartManager('./carts.json');


router.post('/', async (req, res) => {
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
            res.status(404).json({ error: `The cart with id ${cartId} does not exist` });
            return;
        }
        res.json(cart);
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
            res.status(404).json({ error: `The cart with id ${cartId} does not exist` });
        }
    } catch (error) {
        console.error('Error while adding  a product to the cart:', error);
        res.status(500).json({ error: 'Server Internal error' });
    }
});

export default router;
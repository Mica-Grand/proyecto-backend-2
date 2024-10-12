import { Router } from 'express';
import CartsController from '../controllers/carts.controller.js';  

const router = Router();

router.post('/', CartsController.createCart);  
router.get('/:cid', CartsController.getCartById);  
router.post('/:cid/products/:pid', CartsController.addProductToCart); 
router.put('/:cid/products/:pid', CartsController.updateProductQuantity); 
router.put('/:cid', CartsController.updateCart); 
router.delete('/:cid/products/:pid', CartsController.deleteProductFromCart); 
router.delete('/:cid', CartsController.emptyCart);  

export default router;




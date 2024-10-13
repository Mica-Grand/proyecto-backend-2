import { Router } from 'express';
import CartsController from '../controllers/carts.controller.js';  

const router = Router();

const cartsController = new CartsController(); 

router.post('/', cartsController.createCart);  
router.get('/:cid', cartsController.getCartById);  
router.post('/:cid/products/:pid', cartsController.addProductToCart); 
router.put('/:cid/products/:pid', cartsController.updateProductQuantity); 
router.put('/:cid', cartsController.updateCart); 
router.delete('/:cid/products/:pid', cartsController.deleteProductFromCart); 
router.delete('/:cid', cartsController.emptyCart);  

export default router;




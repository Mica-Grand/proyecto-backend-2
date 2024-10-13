import {Router} from 'express';
import ProductsController from '../controllers/products.controller.js';

const router = Router();
const productsController = new ProductsController();


router.get('/', productsController.getProducts);
router.post('/', productsController.createProduct);
router.put("/:pid", productsController.updateProduct);
router.delete('/:pid', productsController.deleteProduct);
router.get("/:pid", productsController.getProductById);


export default router;

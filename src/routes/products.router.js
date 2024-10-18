import {Router} from 'express';
import ProductsController from '../controllers/products.controller.js';
import { authorization } from '../middlewares/auth.js'

const router = Router();
const productsController = new ProductsController();


router.get('/', productsController.getProducts);
router.post('/', authorization('admin'), productsController.createProduct);
router.put("/:pid", authorization('admin'), productsController.updateProduct);
router.delete('/:pid', authorization('admin'), productsController.deleteProduct);
router.get("/:pid", productsController.getProductById);


export default router;

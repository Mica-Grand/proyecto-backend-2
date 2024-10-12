import {Router} from 'express';
import ProductsController from '../controllers/products.controller.js';
const router = Router();


router.get('/', ProductsController.getProducts.bind(ProductsController));
router.post('/', ProductsController.createProduct.bind(ProductsController));
router.put("/:pid", ProductsController.updateProduct.bind(ProductsController));
router.delete('/:pid', ProductsController.deleteProduct.bind(ProductsController));
router.get("/:pid", ProductsController.getProductById.bind(ProductsController));


export default router;

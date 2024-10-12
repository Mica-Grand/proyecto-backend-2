import ProductsRepository from '../repositories/products.repository.js'
import CartRepository from '../repositories/carts.repository.js';

const productService = new ProductsRepository();
const cartService = new CartRepository();


export { productService, cartService };

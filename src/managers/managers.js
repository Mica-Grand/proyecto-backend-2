import CartManager from './cartManager.js';
import ProductManager from './productManager.js';

const productManager = new ProductManager();
const cartManager = new CartManager(productManager);

export { cartManager, productManager };
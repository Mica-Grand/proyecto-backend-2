import ProductsRepository from '../repositories/products.repository.js'
import CartsRepository from '../repositories/carts.repository.js';
import UsersRepository from '../repositories/users.repository.js'
import SessionsRepository from '../repositories/sessions.repository.js';

const productService = new ProductsRepository();
const cartService = new CartsRepository();
const userService = new UsersRepository();
const sessionService = new SessionsRepository();


export { productService, cartService, userService, sessionService };

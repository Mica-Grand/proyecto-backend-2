import ProductsRepository from '../repositories/products.repository.js'
import CartsRepository from '../repositories/carts.repository.js';
import UsersRepository from '../repositories/users.repository.js'

const productService = new ProductsRepository();
const cartService = new CartsRepository();
const userService = new UsersRepository();


export { productService, cartService, userService };

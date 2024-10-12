import CartDAO from "../daos/cart.dao.js";
import CartDTO from '../dtos/cart.dto.js'
import ProductDAO from '../daos/product.dao.js'

export default class CartRepository {
    constructor(){
        this.cartDAO = new CartDAO();
        this.productDAO = new ProductDAO();
    }
    async createCart() {
        return await this.cartDAO.createCart();
    }

    async getCartById(cid) {
        return await this.cartDAO.findCartById(cid);
    }

    async addProductToCart(cid, pid, quantity) {
        const product = await this.productDAO.findProductById(pid);
        if (!product) {
            throw new Error('Product not found');
        }
        return await this.cartDAO.addProductToCart(cid, pid, quantity);
    }

    async updateProductQuantity(cid, pid, quantity) {
        const cart = await this.cartDAO.findCartById(cid);
    if (!cart) {
        throw new Error('Cart not found');
    }

    const productInCart = cart.products.find(p => p.productId.toString() === pid);
    if (!productInCart) {
        throw new Error('Product not found in cart');
    }
        return await this.cartDAO.updateProductQuantity(cid, pid, quantity);
    }

    async updateCart(cid, products) {
        const productIds = products.map(product => product.productId);
        const existingProducts = await this.productDAO.findProductsByIds(productIds);

        if (existingProducts.length !== productIds.length) {
            throw new Error('One or more products not found');
        }

        const cartDTO = new CartDTO({ products });
        return await this.cartDAO.updateCart(cid, cartDTO.products);
    }
    async deleteProductFromCart(cid, pid) {
        return await this.cartDAO.deleteProductFromCart(cid, pid);
    }

    async emptyCart(cid) {
        return await this.cartDAO.emptyCart(cid);
    }

    async isValidCartId(id) {
        return this.cartDAO.isValidId(id);
    }

    async isValidProductId(id) {
        return this.productDAO.isValidId(id);
    }
}
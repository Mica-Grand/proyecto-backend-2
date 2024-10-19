import CartDAO from "../daos/cart.dao.js";
import ProductDAO from "../daos/product.dao.js";

export default class CartsRepository {
  constructor() {
    this.cartDAO = new CartDAO();
    this.productDAO = new ProductDAO();
  }

  async isValidCartId(cid) {
    if (!this.cartDAO.isValidCartId(cid)) {
        throw new Error('Invalid cart ID');
    }
}

  async createCart() {
    return await this.cartDAO.createCart();
  }

  async getCartById(cid) {
    await this.isValidCartId(cid);
    const cart = await this.cartDAO.getCartById(cid);
    if (!cart) throw new Error("Cart not found");
    return cart;
  }

  async addProductToCart(cid, pid, quantity) {
    await this.isValidCartId(cid);
  
    const cart = await this.getCartById(cid);

    const productIndex = cart.products.findIndex((p) => {
        const productIdInCart = p.productId._id || p.productId;  
        return productIdInCart.toString() === pid.toString();
      });
    
      if (productIndex > -1) {
        console.log(`Product found. Incrementing quantity by ${quantity}`);
        cart.products[productIndex].quantity += quantity;
      } else {
        console.log(`Product not found. Adding product with quantity: ${quantity}`);
        cart.products.push({ productId: pid, quantity });
      }
    const updatedCart = await this.cartDAO.saveCart(cart);
    console.log('Cart after update:', updatedCart);
    return updatedCart;
  }

  async updateProductQuantity(cid, pid, quantity) {
    await this.isValidCartId(cid);
    const cart = await this.getCartById(cid);
    const productInCart = cart.products.find(p => p.productId.toString() === pid);

    if (!productInCart) throw new Error('Product not found in the cart');

    productInCart.quantity = quantity;
    await this.cartDAO.saveCart(cart);
    return cart;
}


async updateCart(cid, products) {
    await this.isValidCartId(cid);
    const productIds = products.map(p => p.productId);
    const existingProducts = await this.productDAO.findProductsByIds(productIds);

    if (existingProducts.length !== productIds.length) {
        throw new Error('One or more products not found');
    }

    const cart = await this.getCartById(cid);
    cart.products = products;
    await this.cartDAO.saveCart(cart);

    const updatedCart = await this.cartDAO.getCartById(cid);
    return updatedCart;
}

async deleteProductFromCart(cid, pid) {
  await this.isValidCartId(cid);
  const updatedCart = await this.cartDAO.removeProductFromCart(cid, pid);
  if (!updatedCart) {
      throw new Error('Cart not found');
  }
  return updatedCart;
}

async emptyCart(cid) {
    await this.isValidCartId(cid);
    const cart = await this.getCartById(cid);
    cart.products = [];
    await this.cartDAO.saveCart(cart);
    return cart;
}

}

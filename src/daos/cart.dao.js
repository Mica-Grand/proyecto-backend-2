import cartModel from '../models/cart.model.js'
import mongoose from 'mongoose';


export default class CartDAO {

    async createCart() {
        return await cartModel.create({ products: [] })
    }

    async findCartById(cid) {
        return await cartModel.findById(cid).populate('products.productId').lean()
    }

    async addProductToCart(cid, pid, quantity) {
        const cart = await cartModel.findById(cid);
        const productIndex = cart.products.findIndex(p => p.productId.toString() === pid);
        
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId: pid, quantity });
        }

        await cart.save();
        return cart;
    }


    async updateProductQuantity(cid, pid, quantity) {
        return await cartModel.updateOne(
            { _id: cid, 'products.productId': pid },
            { $set: { 'products.$.quantity': quantity } }
        );
    }

    async updateCart(cid, products) {
        const cart = await cartModel.findById(cid);
        cart.products = products;
        await cart.save();
        return await cartModel.findById(cid).populate('products.productId');
    }

    async deleteProductFromCart(cid, pid) {
        const cart = await cartModel.findById(cid);
        cart.products = cart.products.filter(item => item.productId.toString() !== pid);
        await cart.save();
        return cart;
    }

    async emptyCart(cid) {
        const cart = await cartModel.findById(cid);
        cart.products = [];
        await cart.save();
        return cart;
    }

    isValidId(id) {
        return mongoose.Types.ObjectId.isValid(id);
    }
}
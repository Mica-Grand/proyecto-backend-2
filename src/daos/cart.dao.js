import cartModel from '../models/cart.model.js';
import mongoose from 'mongoose';

export default class CartDAO {
    async createCart() {
        return await cartModel.create({ products: [] });
    }

    async getCartById(cid) {
        return await cartModel.findById(cid).populate('products.productId');

    }

    async saveCart(cart) {
        return await cart.save();
    }

    async updateProductQuantity(cid, pid, quantity) {
        return await cartModel.updateOne(
            { _id: cid, 'products.productId': pid },
            { $set: { 'products.$.quantity': quantity } }
        );
    }

    isValidCartId(cid) {
        return mongoose.Types.ObjectId.isValid(cid);  
    }
}

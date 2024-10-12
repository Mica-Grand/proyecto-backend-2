import productModel from '../models/product.model.JS';
import mongoose from 'mongoose';

class ProductDAO {
    async getAll(filter, options) {
      return await productModel.paginate(filter, options);
    }
  
    async create(productData) {
      return await productModel.create(productData);
    }
  
    async update(productId, updatedFields) {
      return await productModel.updateOne({ _id: productId }, updatedFields);
    }
  
    async delete(productId) {
      return await productModel.deleteOne({ _id: productId });
    }
  
    async getById(productId) {
      return await productModel.findOne({ _id: productId }).lean();
    }
  
    async isValidId(productId) {
      return mongoose.Types.ObjectId.isValid(productId);
    }
  }
  
  export default new ProductDAO();
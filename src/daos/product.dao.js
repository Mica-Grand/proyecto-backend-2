import productModel from '../models/product.model';

export default class ProductDAO {
  async findAll(query) {
      const { limit, page, sort, category, status } = query;
      const filter = {};
      if (category) filter.category = category;
      if (status !== undefined) filter.status = status === 'true';

      const options = {
          limit: parseInt(limit) || 10,
          page: parseInt(page) || 1,
          sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
          lean: true,
      };

      return await productModel.paginate(filter, options);
  }

  async create(product) {
      return await productModel.create(product);
  }

  async update(productId, product) {
      return await productModel.updateOne({ _id: productId }, product);
  }

  async delete(productId) {
      return await productModel.deleteOne({ _id: productId });
  }

  async findById(productId) {
      return await productModel.findOne({ _id: productId });
  }

  isValidId(productId) {
    return mongoose.Types.ObjectId.isValid(productId);
}
}
import ProductDAO from '../dao/product.dao.js';
import ProductDTO from '../dto/product.dto.js';

class ProductsRepository {
  async getProducts(query) {
    const { limit = 10, page = 1, sort, category, status } = query;
    const filter = {};

    if (category) {
      filter.category = category;
    }
    if (status !== undefined) {
      filter.status = status === 'true';
    }

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
      lean: true,
    };

    const { docs, totalDocs, ...rest } = await ProductDAO.getAll(filter, options);
    const products = docs.map(product => new ProductDTO(product));

    return { products, totalDocs, ...rest };
  }

  async createProduct(productData) {
    const productDTO = new ProductDTO(productData);
    return await ProductDAO.create(productDTO);
  }

  async updateProduct(productId, updatedFields) {
    return await ProductDAO.update(productId, updatedFields);
  }

  async deleteProduct(productId) {
    await ProductDAO.delete(productId);
  }

  async getProductById(productId) {
    return await ProductDAO.getById(productId);
  }

  async isValidProductId(productId) {
    return await ProductDAO.isValidId(productId);
  }
}
export default ProductsRepository;
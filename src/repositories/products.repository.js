import ProductDAO from '../daos/product.dao.js';
import ProductDTO from '../dtos/product.dto.js';

export default class ProductsRepository {
  constructor() {
    this.productDAO = new ProductDAO();
    }

  async getProducts(query) {
    return await this.productDAO.findAll(query);
  }

  async createProduct(productData) {
    const productDTO = new ProductDTO(productData);
    return await this.productDAO.create(productDTO);
}

  async updateProduct(productId, updatedFields) {
    const productDTO = new ProductDTO(updatedFields);
    return await this.productDAO.update(productId, productDTO);
  }

  async deleteProduct(productId) {
    await this.productDAO.delete(productId);
  }

  async getProductById(productId) {
    return await this.productDAO.getById(productId);
  }

  async isValidProductId(productId) {
    return await this.productDAO.isValidId(productId);
  }
}

import ProductDAO from '../daos/product.dao.js';
import ProductDTO from '../dtos/product.dto.js';

export default class ProductsRepository {
  constructor() {
    this.productDAO = new ProductDAO();
    }

  async getProducts(query) {
    return await this.productDAO.getProducts(query);
  }

  async createProduct(productData) {
    const productDTO = new ProductDTO(productData);
    return await this.productDAO.createProduct(productDTO);
}

  async updateProduct(productId, updatedFields) {
    const productDTO = new ProductDTO(updatedFields);
    return await this.productDAO.updateProduct(productId, productDTO);
  }

  async deleteProduct(productId) {
    await this.productDAO.deleteProduct(productId);
  }

  async getProductById(productId) {
    return await this.productDAO.getProductById(productId);
  }


}

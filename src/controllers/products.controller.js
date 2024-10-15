import {productService} from '../repositories/index.js'
import mongoose from 'mongoose';

export default class ProductsController {
    async getProducts(req, res) {
      try {
        const result = await productService.getProducts(req.query);
        res.send({ result: "success", payload: result });
      } catch (error) {
        console.error("Error while retrieving the list of products: ", error);
        res.status(500).json({ error: "Error while retrieving products" });
      }
    }
  
    async createProduct(req, res) {
      try {
        const result = await productService.createProduct(req.body);
        res.send({ result: "success", payload: result });
      } catch (error) {
        console.error('Error while creating a new product:', error);
        res.status(500).json({ error: 'Error while creating product' });
      }
    }
  
    async updateProduct(req, res) {
      try {
        const productId = req.params.pid;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({ error: "Invalid product ID" });
        }
        const result = await productService.updateProduct(productId, req.body);
        res.send({ result: "success", payload: result });
      } catch (error) {
        console.error("Error while updating the product:", error);
        res.status(500).json({ error: 'Error while updating product' });
      }
    }
  
    async deleteProduct(req, res) {
      try {
        const productId = req.params.pid;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({ error: 'Invalid product ID' });
        }
        await productService.deleteProduct(productId);
        res.send({ result: "success", payload: { message: "Product deleted successfully" } });
      } catch (error) {
        console.error('Error while deleting the product', error);
        res.status(500).json({ error: 'Error while deleting product' });
      }
    }
  
    async getProductById(req, res) {
      try {
        const productId = req.params.pid;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({ error: "Invalid product ID" });
        }
        const result = await productService.getProductById(productId);
        if (!result) {
          return res.status(404).json({ error: "Product not found" });
        }
        res.send({ result: "success", payload: result });
      } catch (error) {
        console.error('Error while fetching the product', error);
        res.status(500).json({ error: 'Error while fetching product' });
      }
    }
  }
  

import { cartService } from "../repositories/index.js";

export default class CartsController {
  async createCart(req, res) {
    try {
      const cart = await cartService.createCart();
      res.status(201).json({
        result: "success",
        message: "Cart created successfully",
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({
        result: "error",
        message: "Error creating cart",
        error: error.message,
      });
    }
  }

  async getCartById(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCartById(cid);
      res.status(200).json({
        result: "success",
        message: "Cart retrieved successfully",
        payload: cart,
      });
    } catch (error) {
      res.status(404).json({
        result: "error",
        message: "The cart doesn´t exist",
        error: error.message,
      });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      let { quantity } = req.body;

      if (!cid || !pid) {
        return res.status(400).json({
          result: "error",
          message: "Cart ID and Product ID are required.",
        });
      }

      quantity = quantity !== undefined && !isNaN(parseInt(quantity)) && parseInt(quantity) > 0
          ? parseInt(quantity)
          : 1;


      const cart = await cartService.addProductToCart(cid, pid, quantity);

      res.status(200).json({
        result: "success",
        message: "The product was successfully added to the cart",
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({
        result: "error",
        message: "The product couldn´t be added to the cart",
        error: error.message,
      });
    }
  }

  async updateProductQuantity(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      const cart = await cartService.updateProductQuantity(cid, pid, quantity);
      res.status(200).json({
        result: "success",
        message: "The product quantity was successfully updated",
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({
        result: "error",
        message: "The product quantity couldn´t be updated",
        error: error.message,
      });
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { products } = req.body;

      const cart = await cartService.updateCart(cid, products);

      res.status(200).json({
        result: "success",
        message: "The cart has been successfully updated",
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({
        result: "error",
        message: "The cart couldn´t be updated",
        error: error.message,
      });
    }
  }

  async deleteProductFromCart(req, res) {
    try {
      const { cid, pid } = req.params;
      if (
        !(await cartService.isValidCartId(cid)) ||
        !(await cartService.isValidProductId(pid))
      ) {
        return res.status(400).send({ result: "error", message: "Invalid ID" });
      }
      const cart = await cartService.deleteProductFromCart(cid, pid);

      res.status(200).json({
        result: "success",
        message: "The product has been successfully deleted",
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({
        result: "error",
        message: "The product couldn´t be deleted",
        error: error.message,
      });
    }
  }

  async emptyCart(req, res) {
    try {
      const { cid } = req.params;

      const cart = await cartService.emptyCart(cid);

      res.status(200).json({
        result: "success",
        message: "The cart has been emptied",
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({
        result: "error",
        message: "The cart couldn´t be emptied",
        error: error.message,
      });
    }
  }
}

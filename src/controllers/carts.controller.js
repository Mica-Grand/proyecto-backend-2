import { cartService } from "../repositories/index.js";

export default class CartsController {
    async createCart(req, res) {
        try {
            const result = await cartService.createCart();
            res.send({ result: "success", payload: result });
        } catch (error) {
            res.status(500).send({ result: "error", payload: error });
        }
    }
    async getCartById(req, res) {
        try {
            const { cid } = req.params;
            if (!(await cartService.isValidCartId(cid))) {
                return res.status(400).send({ result: "error", message: "Invalid cart ID" });
            }
            const cart = await cartService.getCartById(cid);
            if (!cart) {
                return res.status(404).json({ error: "Cart not found" });
            }
            res.send({ result: "success", payload: cart });
        } catch (error) {
            res.status(500).send({ result: "error", payload: error });
        }
    }

    async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            if (!(await cartService.isValidCartId(cid)) || !(await cartService.isValidCartId(pid))) {
                return res.status(400).send({ result: "error", message: "Invalid ID" });
            }
            const result = await cartService.addProductToCart(cid, pid, quantity);
            res.send({ result: "success", payload: result });
        } catch (error) {
            res.status(500).send({ result: "error", payload: error });
        }
    }

    async updateProductQuantity(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            if (!(await cartService.isValidCartId(cid)) || !(await cartService.isValidCartId(pid))) {
                return res.status(400).send({ result: "error", message: "Invalid ID" });
            }
            const result = await cartService.updateProductQuantity(cid, pid, quantity);
            res.send({ result: "success", payload: result });
        } catch (error) {
            res.status(500).send({ result: "error", payload: error });
        }
    }

    async updateCart(req, res) {
        try {
            const { cid } = req.params;
            const { products } = req.body;
    
            if (!products || !Array.isArray(products)) {
                return res.status(400).send({ result: "error", message: "Products array is required and must be an array" });
            }
            const result = await cartService.updateCart(cid, products);
            res.send({ result: "success", payload: result });
        } catch (error) {
            res.status(500).send({ result: "error", payload: error.message });
        }
    }

    async deleteProductFromCart(req, res) {
        try {
            const { cid, pid } = req.params;
            if (!(await cartService.isValidCartId(cid)) || !(await cartService.isValidCartId(pid))) {
                return res.status(400).send({ result: "error", message: "Invalid ID" });
            }
            const result = await cartService.deleteProductFromCart(cid, pid);
            res.send({ result: "success", payload: result });
        } catch (error) {
            res.status(500).send({ result: "error", payload: error });
        }
    }

    async emptyCart(req, res) {
        const { cid } = req.params;
        try {
            if (!(await cartService.isValidCartId(cid))) {
                return res.status(400).send({ result: "error", message: "Invalid cart ID" });
            }
            const result = await cartService.emptyCart(cid);
            res.send({ result: "success", payload: result });
        } catch (error) {
            res.status(500).send({ result: "error", payload: error });
        }
    }
}
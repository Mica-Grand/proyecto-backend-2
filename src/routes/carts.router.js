import { Router } from 'express';
import cartModel from '../models/cart.model.js';

const router = Router();

// Crea carrito nuevo
router.post('/', async (req, res) => {
  try {
    let result = await cartModel.create({ products: [] });
    res.send({ result: "success", payload: result });
  } catch (error) {
    console.error('Error while creating a new cart:', error);
    res.status(500).send({ result: "error", payload: error });
  }
});

// Agrega producto al carrito
router.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  let { quantity } = req.body;
  quantity = parseInt(quantity);
  if (isNaN(quantity)) {
    return res.status(400).send({ result: "error", message: "Invalid quantity" });
  }
  try {
    let cart = await cartModel.findById(cid);
    if (!cart) {
      return res.status(404).send({ result: "error", message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(p => p.productId.toString() === pid);
    
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId: pid, quantity });
    }

    await cart.save();
    res.send({ result: "success", payload: cart });
  } catch (error) {
    console.error('Error while adding product to cart:', error);
    res.status(500).send({ result: "error", payload: error });
  }
});

// Obtiene carrito por ID
router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    let cart = await cartModel.findById(cid).populate('products.productId');
    if (!cart) {
      throw new Error('El carrito no existe');
    }
    res.send({ result: "success", payload: cart });
  } catch (error) {
    console.error('Error while fetching a cart:', error);
    res.status(500).send({ result: "error", payload: error });
  }
});

// Actualiza cantidad de producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    let result = await cartModel.updateOne(
      { _id: cid, 'products.productId': pid },
      { $set: { 'products.$.quantity': quantity } }
    );
    res.send({ result: "success", payload: result });
  } catch (error) {
    console.error('Error while updating a cart:', error);
    res.status(500).send({ result: "error", payload: error });
  }
});

// Actualiza productos en el carrito
router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    let result = await cartModel.updateOne({ _id: cid }, { products });
    result = await cartModel.findById(cid).populate('products.productId');
    res.send({ result: "success", payload: result });
  } catch (error) {
    console.error('Error while updating a cart:', error);
    res.status(500).send({ result: "error", payload: error });
  }
});

// Elimina producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    cart.products = cart.products.filter(item => item.productId.toString() !== pid);
    await cart.save();
    res.json({ status: 'success', message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Vacía carrito
router.delete('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    let result = await cartModel.updateOne({ _id: cid }, { $set: { products: [] } });
    res.send({ result: "success", payload: result });
  } catch (error) {
    console.error('Error while emptying the cart:', error);
    res.status(500).send({ result: "error", payload: error });
  }
});

export default router;

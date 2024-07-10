import {Router} from 'express';
import { productManager } from '../managers/managers.js';

const router = Router();

router.get('/', async (req, res) => {
    let products;
    try {
        const limit = req.query.limit;
        products = await productManager.getProducts();
        if (limit) {
            const parsedLimit = parseInt(limit);
            if(!isNaN(parsedLimit) && parsedLimit >= 1){
                products = products.slice(0, parsedLimit);
            } else {
            return res.status(400).json({ error: 'Invalid limit parameter' });
        }}
        console.log('Products:', products);
        res.json(products);
    } catch (error) {
        console.error('Error while retrieving the list of products: ', error);
        res.status(500).json({ error: 'Error while retrieving products' });
    }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    if (isNaN(productId)) {
      res.status(400).json({ error: "Invalid product ID. Enter a number" });
      return;
    }

    let product;
    try {
      product == (await productManager.getProductById(productId));
    } catch (error) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error("Error while retrieving product:", error);
    res.status(500).json({ error: "Error retrieving the product" });
  }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        //Falta agregar validación de tipos de datos
        const newProduct = await productManager.addProduct(title, description, code, price, stock, category, thumbnails);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error  while creating a new product:', error);
        res.status(500).json({ error: 'All fields are mandatory' });
    }
});

router.put("/:pid", async (req, res) => {
  let updatedProduct;
  try {
    const productId = parseInt(req.params.pid);
    const allowedFields = [
      "title",
      "description",
      "code",
      "price",
      "stock",
      "category",
      "thumbnails",
    ];
            //Falta agregar validación para q   ue no permita cambiar de tipos de datos

    const updatedFields = {};

    for (const key in req.body) {
      if (key !== "id" && allowedFields.includes(key)) {
        updatedFields[key] = req.body[key];
      } else if (key !== "id") {
        return res
          .status(400)
          .json({ error: `Field '${key}' is not allowed for product update` });
      }
    }

    updatedProduct = await productManager.updateProduct(
      productId,
      updatedFields
    );
    console.log(updatedProduct);

    res
      .status(200)
      .json({
        message: `You successfully updated the product with id ${productId}. The updated data is ${JSON.stringify(
          updatedFields
        )}`,
      });
  } catch (error) {
    console.error("Error while updating the product:", error);
    res.status(500).json({ error: "Error updating the product" });
  }
});

router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        await productManager.deleteProduct(productId);
        res.json({ message: `The product with ID ${productId} has been succesfully deleted` });
    } catch (error) {
        console.error('Error while deleting the product', error);
        res.status(500).json({ error: 'Server Internal Error' });
    }
});

export default router;

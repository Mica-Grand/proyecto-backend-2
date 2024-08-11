import {Router} from 'express';
import productModel from '../models/product.model.js';

const router = Router();


router.get('/', async (req, res) => {
  let { limit, page, sort, query } = req.query;
  if (!page) page = 1;
  if (!limit) limit = 10;


  let filter = {};

  if (query === 'undefined') query = '';
  if (query) {
    const isBoolean = query.toLowerCase() === 'true' || query.toLowerCase() === 'false';

    if (isBoolean) {
      filter = { status: query.toLowerCase() === 'true' };
    } else {
      filter = { category: query };
    }
  }

  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
    lean:true
  };
  try {
    const result = await productModel.paginate(filter, options);
    result.prevLink = result.hasPrevPage ? `?page=${result.prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null;
    result.nextLink = result.hasNextPage ? `?page=${result.nextPage}&limit=${limit}&sort=${sort}&query=${query}` : null
    result.isValid = !(page <= 0 || page > result.totalPages)
    res.send({ result: "success", payload: result });
  } catch (error) {
    console.error("Error while retrieving the list of products: ", error);
    res.status(500).json({ error: "Error while retrieving products" });
  }
})

router.post('/', async (req, res) => {
  try {
      let { title, description, code, price, stock, category, thumbnails, status } = req.body;
      console.log(req.body);
      if (!title || !description || !code || !price || stock === undefined || stock === null|| !category ) {
        return res.send({status:"error", error:"All fields are mandatory, except thumbnails."});
    }
      if (typeof status === 'undefined') {
      return res.send({status:"error", error:"The status field is mandatory."});
    }
      let result = await productModel.create({title, description, code, price, stock, category, thumbnails, status});
      res.send({result: "success", payload: result});
  } catch (error) {
      console.error('Error  while creating a new product:', error);
      res.status(500).json({ error: 'Error while creating product' });
  }
})

router.put("/:pid", async (req, res) => {
  try {
    let productId = req.params.pid;
    let allowedFields = [
      "title",
      "description",
      "code",
      "price",
      "stock",
      "category",
      "thumbnails",
      "status"
    ];

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

    let result = await productModel.updateOne({_id:productId}, updatedFields)
    res.send({result: "success", payload: result});
   
  } catch (error) {
    console.error("Error while updating the product:", error);
    res.status(500).json({ error: 'Error while updating product' });
  }
});


router.delete('/:pid', async (req, res) => {
  try {
      const productId = req.params.pid;
      let result = await productModel.deleteOne({_id:productId});
      res.send({result: "success", payload: result});
  } catch (error) {
      console.error('Error while deleting the product', error);
      res.status(500).json({ error: 'Error while deleting product' });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    if (!productId) {
      return res.status(400).json({ error: "Invalid product ID. Enter a valid ID" });
    }
    let result = await productModel.findOne({_id:productId});
    res.send({result: "success", payload: result});
    } catch (error) {
      console.error('Error while fetching the product', error);
      res.status(500).json({ error: 'Error while fetching product' });
      
    }
});






export default router;

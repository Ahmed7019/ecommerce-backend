import multer from "multer";
const upload = multer();
import connection from "../Database/connection.js";

// @desc    Get all products
// @route   GET /api/products

export const getProducts = (req, res, next) => {
  connection.query(`CALL getAllProducts()`, (err, result) => {
    if (err) {
      err.status = 500;
      return next(err);
    }

    res.status(200).json(result[0]);
  });
};

// @desc    Get a product by name
// @route   GET /api /products /:name

export const getProductByName = (req, res, next) => {
  const product = req.params.name;
  if (!product) {
    const err = new Error(`Bad request`);
    err.status = 400;
    return next(err);
  }
  connection.query(`CALL getProductByName("${product}")`, (err, result) => {
    if (err) {
      err.status = 500;
      return next(err);
    }

    if (result.affectedRows === 0) {
      const error = new Error("Not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(result[0]);
  });
};

// @desc    Get a product by id
// @route   GET /api /products /id /:id

export const getProductById = (req, res, next) => {
  if (parseInt(req.params.id)) {
    const id = parseInt(req.params.id);
    const product = products.find((product) => product.id === id);

    if (!product) {
      const error = new Error(`product with id ${id} was not found`);
      error.status = 404;
      return next(error);
    }

    res.status(201).json(product);
  }
};

// @desc    create a product by id
// @route   POST /api /products

export const createNewProduct =
  (upload.single(),
  (req, res, next) => {
    // Check if missing one of the fields
    const name = req.body.name,
      description = req.body.description,
      price = req.body.price,
      storeId = req.body.store_id,
      imageUrl = req.body.image_url,
      stockQuantity = req.body.stock_quantity,
      category = req.body.category;

    if (
      !name ||
      !description ||
      !price ||
      !storeId ||
      !imageUrl ||
      !stockQuantity ||
      !category
    ) {
      const err = new Error("Bad request : A field or more is missing");
      err.status = 400; // Bad request
      return next(err);
    }

    // If no bad request add product to database
    connection.query(
      `CALL createNewProduct("${name}",${storeId},"${description}",${price},${stockQuantity},"${imageUrl}","${category}")`,
      (err, result) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ success: "Product added successfullt" });
      }
    );
  });

// @desc    update a product by id
// @route   PUT /api /products/ id/ :id

export const updateProductUsingId =
  (upload.array(),
  (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProduct = products.find((product) => product.id === id);

    if (!updatedProduct) {
      return res.status(404).json({ msg: "The product was not found" });
    }
    if (!req.body.name || !req.body.price || !req.body.brand) {
      return res.status(404).json({ msg: "One of the fields is missing" });
    }

    updatedProduct.name = req.body.name;
    updatedProduct.price = req.body.price;
    updatedProduct.brand = req.body.brand;
    res.status(204).json(updatedProduct);
  });

// @desc    delete a product by id
// @route   DELETE /api /products/ id/ :id

export const deleteProductUsingId = (req, res, next) => {
  const id = parseInt(req.body.id);
  connection.query(`CALL deleteProduct(${id})`, (err, result) => {
    if (err) return next(err);

    res
      .status(200)
      .json({ msg: `Product with ID ${id} Deleted Successfully!` });
  });
};

// @desc    delete a product by name
// @route   DELETE /api /products/ :name

export const deleteProductUsingName = (req, res) => {
  const name = req.params.name.toLowerCase();
  const product = products.find((product) =>
    product.name.toLowerCase().includes(name)
  );

  if (!product) {
    return res
      .status(404)
      .json({ msg: `product with name ${req.params.name} was not found` });
  }

  const newProducts = products.filter(
    (product) => !product.name.toLowerCase().includes(name)
  );
  res.status(200).json(newProducts);
};

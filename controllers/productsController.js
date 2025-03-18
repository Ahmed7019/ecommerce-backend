import multer from "multer";
const upload = multer();
import connection from "../Database/connection.js";

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 49.99,
    brand: "TechSound",
    url: "https://images.pexels.com/photos/20573136/pexels-photo-20573136/free-photo-of-airpod-on-mirror.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Portable Power Bank 10000mAh",
    price: 29.95,
    brand: "PowerUp",
    url: "https://images.pexels.com/photos/16814788/pexels-photo-16814788/free-photo-of-man-charging-cellphone-with-powerbank.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Smartwatch Fitness Tracker",
    price: 79.5,
    brand: "FitLife",
    url: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    name: "Phone Ring Light with Tripod",
    price: 19.99,
    url: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600",
    brand: "GlowUp",
  },
  {
    id: 5,
    name: "Laptop Sleeve 15-inch",
    price: 24.99,
    url: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600",
    brand: "CarryOn",
  },
  {
    id: 6,
    name: "USB-C Multiport Adapter",
    price: 39.99,
    url: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600",
    brand: "ConnectPro",
  },
  {
    id: 7,
    name: "Adjustable Phone Stand",
    price: 14.5,
    url: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600",
    brand: "ViewMaster",
  },
  {
    id: 8,
    name: "Noise-Cancelling Headphones",
    price: 99.0,
    brand: "AcousticWave",
    url: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 9,
    name: "Waterproof Phone Pouch",
    price: 9.99,
    brand: "AquaGuard",
    url: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 10,
    name: "Camera Lens Cleaning Kit",
    price: 12.99,
    brand: "ClearSight",
    url: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

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
  (req, res) => {
    console.log("Request Headers:", req.headers);
    console.log("Request Body:", req.params);
    if (!req.body.name || !req.body.price || !req.body.brand) {
      return res.status(404).json({ msg: "One of the fields is missing" });
    }

    products.push({
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price,
      brand: req.body.brand,
    });
    res.status(200).json(products);
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
    res.status(200).json(updatedProduct);
  });

// @desc    delete a product by id
// @route   DELETE /api /products/ id/ :id

export const deleteProductUsingId = (req, res, next) => {
  const id = parseInt(req.params.id);
  const productToDelete = products.find((product) => product.id === id);

  if (!productToDelete) {
    const err = new Error(`Product with id ${id} was not found`);
    err.status = 404;
    next(err);
  }

  const newProducts = products.filter((product) => product.id !== id);
  res.status(200).json(newProducts);
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

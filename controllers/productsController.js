import multer from "multer";
const upload = multer();

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 49.99,
    brand: "TechSound",
  },
  {
    id: 2,
    name: "Portable Power Bank 10000mAh",
    price: 29.95,
    brand: "PowerUp",
  },
  {
    id: 3,
    name: "Smartwatch Fitness Tracker",
    price: 79.5,
    brand: "FitLife",
  },
  {
    id: 4,
    name: "Phone Ring Light with Tripod",
    price: 19.99,
    brand: "GlowUp",
  },
  {
    id: 5,
    name: "Laptop Sleeve 15-inch",
    price: 24.99,
    brand: "CarryOn",
  },
  {
    id: 6,
    name: "USB-C Multiport Adapter",
    price: 39.99,
    brand: "ConnectPro",
  },
  {
    id: 7,
    name: "Adjustable Phone Stand",
    price: 14.5,
    brand: "ViewMaster",
  },
  {
    id: 8,
    name: "Noise-Cancelling Headphones",
    price: 99.0,
    brand: "AcousticWave",
  },
  {
    id: 9,
    name: "Waterproof Phone Pouch",
    price: 9.99,
    brand: "AquaGuard",
  },
  {
    id: 10,
    name: "Camera Lens Cleaning Kit",
    price: 12.99,
    brand: "ClearSight",
  },
];

// @desc    Get all products
// @route   GET /api/products

export const getProducts = (req, res, next) => {
  if (!products.length || !products) {
    const err = new Error(`No product was found`);
    err.status = 404;
    return next(err);
  }
  res.status(200).json(products);
};

// @desc    Get a product by name
// @route   GET /api /products /:name

export const getProductByName = (req, res, next) => {
  if (isNaN(req.params.name)) {
    const name = req.params.name.toLowerCase();
    const productName = products.filter((product) =>
      product.name.toLowerCase().includes(name)
    );
    if (!productName || productName.length === 0) {
      const err = new Error(
        `product with name ${req.params.name} was not found`
      );

      err.status = 404;
      return next(err);
    }

    res.status(201).json(productName);
  }
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

import express from "express";
import multer from "multer";
const router = express.Router();
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

router.get("/", (req, res) => {
  res.status(200).json(products);
});

// Search by name
router.get("/:name", (req, res) => {
  if (isNaN(req.params.name)) {
    const name = req.params.name.toLowerCase();
    const productName = products.filter((product) =>
      product.name.toLowerCase().includes(name)
    );
    if (!productName || productName.length === 0) {
      return res
        .status(404)
        .json({ msg: `product with name ${req.params.name} was not found` });
    }

    res.status(201).json(productName);
  }
});

router.get("/id/:id", (req, res) => {
  if (parseInt(req.params.id)) {
    const id = parseInt(req.params.id);
    const product = products.find((product) => product.id === id);

    if (!product) {
      return res
        .status(404)
        .json({ msg: `product with id ${id} was not found` });
    }

    res.status(201).json(product);
  }
});

// Add post
// class Product {
//   constructor(id, name, price, brand) {
//     this.id = id;
//     this.name = name;
//     this.price = price;
//     this.brand = brand;
//   }
// }

router.post("/", upload.single(), (req, res) => {
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

// Update a product

router.put("/id/:id", upload.array(), (req, res) => {
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

export default router;

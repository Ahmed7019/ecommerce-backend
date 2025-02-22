import express from "express";
import products from "./Routes/products.js";
const app = express();

app.use("/api/products", products);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on port => ${PORT}`));

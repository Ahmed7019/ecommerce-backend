import express from "express";
import cors from "cors";

import products from "./Routes/products.js";
import stores from "./Routes/stores.js";

import bodyParser from "body-parser";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Middelware
app.use(logger);

// Routes
app.use("/api/products", products);
app.use("/api/stores", stores);

// Error handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port => ${PORT}`));

import express from "express";
import cors from "cors";

import products from "./Routes/products.js";
import stores from "./Routes/stores.js";
import user from "./Routes/user.js";
import authRoute from "./Routes/authRoute.js";
import refresh from "./Routes/refresh.js";
import cart from "./Routes/cart.js";
import bodyParser from "body-parser";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import connection from "./Database/connection.js";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middleware/verifyJWT.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Middelware
app.use(logger);

// Routes
app.use("/api/products", products);
app.use("/api/stores", stores);
app.use("/auth", authRoute);
app.use("/refresh", refresh);

app.use(verifyJWT);
app.use("/api/user", user);
app.use("/cart", cart);

// Error handler
app.use(notFound);
app.use(errorHandler);
// Connect to DB

connection.connect((err) => {
  if (err) {
    console.log("A error has been occurred " + "while connecting to database.");
    throw err;
  }

  app.listen(PORT, () =>
    console.log(
      `DB connection established & Server is running on port => ${PORT}`
    )
  );
});

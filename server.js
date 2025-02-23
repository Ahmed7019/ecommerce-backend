import express from "express";
import cors from "cors";
import products from "./Routes/products.js";
import bodyParser from "body-parser";
import multer from "multer";

const PORT = process.env.PORT || 8080;
const app = express();
const upload = multer();
// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/products", products);

app.listen(PORT, () => console.log(`Server is running on port => ${PORT}`));

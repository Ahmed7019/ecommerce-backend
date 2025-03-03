import express from "express";

import { getStoreById, getStores } from "../controllers/storesController.js";
const router = express.Router();

// Get all stores
router.get("/", getStores);
// Get store by id
router.get("/id/:id", getStoreById);

// Get store by name
router.get("/:name");

export default router;

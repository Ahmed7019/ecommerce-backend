import express from "express";

import {
  createNewStore,
  deleteStore,
  getStoreById,
  getStoreByName,
  getStores,
} from "../controllers/storesController.js";
const router = express.Router();

// Get all stores
router.get("/", getStores);
// Get store by id
router.get("/id/:id", getStoreById);

// Get store by name
router.get("/:name", getStoreByName);

// CREATE a new store
router.post("/", createNewStore);

// Delete a store
router.delete("/id/:id", deleteStore);
export default router;

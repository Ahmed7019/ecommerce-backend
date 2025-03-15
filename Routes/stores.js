import express from "express";

import {
  createNewStore,
  deleteStore,
  getStoreById,
  getStoreByName,
  getStores,
  updateInfo,
} from "../controllers/storesController.js";
const router = express.Router();

// Get all stores
router.get("/", getStores);
// Get store by id
router.get("/:id", getStoreById);

// Get store by name
router.get("/:name", getStoreByName);

// CREATE a new store
router.post("/", createNewStore);

// Update store info using ID
router.put("/id/:id", updateInfo);

// Delete a store
router.delete("/id/:id", deleteStore);
export default router;

import express from "express";

import {
  createNewStore,
  deleteStore,
  getStoreById,
  getStores,
  updateInfo,
} from "../controllers/storesController.js";
const router = express.Router();

// Get all stores
router.get("/", getStores);

// Get store by id
router.get("/:id", getStoreById);

// CREATE a new store
router.post("/", createNewStore);

// Update store info using ID
router.put("/:id", updateInfo);

// Delete a store
router.delete("/id/:id", deleteStore);
export default router;

import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import { getStoreData, createStore } from "../controllers/storeController.js";

const router = express.Router();

router.use(requireAuth);

// create store
router.post("/create", createStore);

// get store info
router.get("/data", getStoreData);

export default router;

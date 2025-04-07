import express from "express";
import { createItem, deleteItem, getItems, updateItem } from "../controllers/items.controller.js";

const router = express.Router()

router.get("/", getItems)
router.post("/", createItem)
router.put("/:id", updateItem)
router.delete("/:id", deleteItem)

export default router
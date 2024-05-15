import express from "express";
const router = express.Router();
import { getAllItems,getItemById,createItem,updateItem,deleteItem } from "../Controllers/items_controller.js";

router.get("/items", getAllItems);
router.get("/items/:id", getItemById);
router.post("/items", createItem);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

export default router;
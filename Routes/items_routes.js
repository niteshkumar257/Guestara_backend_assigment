import express from "express";
const router = express.Router();
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  getItemsByCategoryId,
  getItemsBySubcategoryId,
  getItemByName,
} from "../Controllers/items_controller.js";
import upload from "../middleware/image_upload.js";

router.get("/items", getAllItems);
router.get("/items/ByName", getItemByName);
router.get("/items/:id", getItemById);
router.get("/items/category/:categoryId", getItemsByCategoryId);
router.get("/items/subcategory/:subcategoryId", getItemsBySubcategoryId);
router.post("/items",upload.single('image_url'), createItem);
router.put("/items/:id", updateItem);

export default router;

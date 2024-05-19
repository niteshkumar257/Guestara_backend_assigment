import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
} from "../Controllers/category_controller.js";
import upload from "../middleware/image_upload.js";
const router = express.Router();

router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);
router.post("/addCategory",upload.single('image_url'), createCategory);
router.put("/updateCategory/:id", updateCategory);

export default router;

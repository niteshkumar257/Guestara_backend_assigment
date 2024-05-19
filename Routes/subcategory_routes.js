import express from "express";
const router = express.Router();
import {
  getAllSubCategories,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  getSubCategoryByCategoryId,
} from "../Controllers/Subcategory_controller.js";
import upload from "../middleware/image_upload.js";

router.get("/subcategories", getAllSubCategories);
router.get("/subcategories/:id", getSubCategoryById);
router.get("/subcategories/category/:categoryId", getSubCategoryByCategoryId);
router.post("/subcategories",upload.single('image_url'), createSubCategory);
router.put("/subcategories/:id", updateSubCategory);

export default router;

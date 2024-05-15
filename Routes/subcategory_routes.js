import express from "express";
const router = express.Router();
import { getAllSubCategories,getSubCategoryById,createSubCategory,updateSubCategory,deleteSubCategory } from "../Controllers/Subcategory_controller.js";

router.get("/subcategories", getAllSubCategories);
router.get("/subcategories/:id", getSubCategoryById);
router.post("/subcategories", createSubCategory);
router.put("/subcategories/:id", updateSubCategory);
router.delete("/subcategories/:id", deleteSubCategory);

export default router;
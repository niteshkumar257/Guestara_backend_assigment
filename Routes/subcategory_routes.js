import express from "express";
const router = express.Router();
import { getAllSubCategories,getSubCategoryById,createSubCategory,updateSubCategory } from "../Controllers/Subcategory_controller.js";

router.get("/getAllSubcategories", getAllSubCategories);
router.get("/subcategories/:", getSubCategoryById);
router.post("/subcategories", createSubCategory);
router.put("/subcategories/:id", updateSubCategory);


export default router;
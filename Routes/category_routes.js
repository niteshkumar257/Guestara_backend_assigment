import express from "express";
import { getAllCategories,getCategoryById,createCategory,updateCategory } from "../Controllers/category_controller.js";
const router = express.Router();

router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);
router.post("/addCategory", createCategory);
router.put("/updateCategory/:id", updateCategory);



export default router;
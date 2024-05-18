import express from "express";
import { getAllCategories, getCategoryById, createCategory, updateCategory } from "../Controllers/category_controller.js";

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/categories", getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Category not found
 */
router.get("/categories/:id", getCategoryById);

/**
 * @swagger
 * /addCategory:
 *   post:
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Category
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post("/addCategory", createCategory);

/**
 * @swagger
 * /updateCategory/{id}:
 *   put:
 *     summary: Update a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Category Name
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.put("/updateCategory/:id", updateCategory);

export default router;

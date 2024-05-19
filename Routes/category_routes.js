import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
} from "../Controllers/category_controller.js";
import upload from "../middleware/image_upload.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The category name
 *         image_url:
 *           type: string
 *           format: binary
 *           description: The URL of the category image
 *         description:
 *           type: string
 *           description: The description of the category
 *         tax_applicability:
 *           type: boolean
 *           description: Indicates if tax is applicable
 *         tax:
 *           type: number
 *           description: The tax amount, if applicable
 *         tax_type:
 *           type: string
 *           description: The type of tax
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 */

/**
 * @swagger
 * /api/v1/category/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/categories", getAllCategories);

/**
 * @swagger
 * /api/v1/category/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: The category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.get("/categories/:id", getCategoryById);

/**
 * @swagger
 * /api/v1/category/addCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - image_url
 *               - tax_applicability
 *             properties:
 *               name:
 *                 type: string
 *                 description: The category name
 *               image_url:
 *                 type: string
 *                 format: binary
 *                 description: The URL of the category image
 *               description:
 *                 type: string
 *                 description: The description of the category
 *               tax_applicability:
 *                 type: boolean
 *                 description: Indicates if tax is applicable
 *               tax:
 *                 type: number
 *                 description: The tax amount, if applicable
 *               tax_type:
 *                 type: string
 *                 enum: [Income Tax, Sales Tax, Property Tax,Corporate Tax]
 *                 description: The type of tax
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/addCategory", upload.single('image_url'), createCategory);


/**
 * @swagger
 * /api/v1/category/updateCategory/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
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
 *                 description: The category name
 *               image_url:
 *                 type: string
 *                 description: The URL of the category image
 *               description:
 *                 type: string
 *                 description: The description of the category
 *               tax_applicability:
 *                 type: boolean
 *                 description: Indicates if tax is applicable
 *               tax:
 *                 type: number
 *                 description: The tax amount, if applicable
 *               tax_type:
 *                 type: string
 *                 enum: [Income Tax, Sales Tax, Property Tax, Corporate Tax]
 *                 description: The type of tax
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Category not found
 */
router.put("/updateCategory/:id", updateCategory);

export default router;

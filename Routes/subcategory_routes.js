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

/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category_id
 *       properties:
 *         name:
 *           type: string
 *           description: The subcategory name
 *         image_url:
 *           type: string
 *           format: binary
 *           description: The URL of the subcategory image
 *         description:
 *           type: string
 *           description: The description of the subcategory
 *         tax_applicability:
 *           type: boolean
 *           description: Indicates if tax is applicable
 *         tax:
 *           type: number
 *           description: The tax amount, if applicable
 *         tax_type:
 *           type: string
 *           description: The type of tax
 *         category_id:
 *           type: integer
 *           description: The ID of the parent category
 */

/**
 * @swagger
 * tags:
 *   name: SubCategories
 *   description: API for managing subcategories
 */

/**
 * @swagger
 * /api/v1/subcategory/subcategories:
 *   get:
 *     summary: Get all subcategories
 *     tags: [SubCategories]
 *     responses:
 *       200:
 *         description: List of all subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 */
router.get("/subcategories", getAllSubCategories);

/**
 * @swagger
 * /api/v1/subcategory/subcategories/{id}:
 *   get:
 *     summary: Get a subcategory by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory ID
 *     responses:
 *       200:
 *         description: The subcategory details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       404:
 *         description: Subcategory not found
 */
router.get("/subcategories/:id", getSubCategoryById);

/**
 * @swagger
 * /api/v1/subcategory/subcategories/category/{categoryId}:
 *   get:
 *     summary: Get subcategories by category ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: List of subcategories for the given category ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 *       404:
 *         description: Subcategory not found
 */
router.get("/subcategories/category/:categoryId", getSubCategoryByCategoryId);

/**
 * @swagger
 * /api/v1/subcategory/subcategories:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: The subcategory name
 *               image_url:
 *                 type: string
 *                 format: binary
 *                 description: The URL of the subcategory image
 *               description:
 *                 type: string
 *                 description: The description of the subcategory
 *               tax_applicability:
 *                 type: boolean
 *                 description: Indicates if tax is applicable
 *               tax:
 *                 type: number
 *                 description: The tax amount, if applicable
 *               tax_type:
 *                 type: string
 *                 description: The type of tax
 *               category_id:
 *                 type: integer
 *                 description: The ID of the parent category
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/subcategories", upload.single('image_url'), createSubCategory);

/**
 * @swagger
 * /api/v1/subcategory/subcategories/{id}:
 *   put:
 *     summary: Update an existing subcategory
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: The subcategory name
 *               image_url:
 *                 type: string
 *                 format: binary
 *                 description: The URL of the subcategory image
 *               description:
 *                 type: string
 *                 description: The description of the subcategory
 *               tax_applicability:
 *                 type: boolean
 *                 description: Indicates if tax is applicable
 *               tax:
 *                 type: number
 *                 description: The tax amount, if applicable
 *               tax_type:
 *                 type: string
 *                 description: The type of tax
 *       200:
 *         description: Subcategory updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Subcategory not found
 */
router.put("/subcategories/:id", updateSubCategory);

export default router;

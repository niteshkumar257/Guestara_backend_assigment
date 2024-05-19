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

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - base_amount
 *         - total_amount
 *       properties:
 *         name:
 *           type: string
 *           description: The item name
 *         image_url:
 *           type: string
 *           format: binary
 *           description: The URL of the item image
 *         description:
 *           type: string
 *           description: The description of the item
 *         tax_applicability:
 *           type: boolean
 *           description: Indicates if tax is applicable
 *         tax:
 *           type: number
 *           description: The tax amount, if applicable
 *         base_amount:
 *           type: number
 *           description: The base amount of the item
 *         discount:
 *           type: number
 *           description: The discount amount on the item
 *         total_amount:
 *           type: number
 *           description: The total amount of the item (Base - Discount)
 */

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API for managing items
 */

/**
 * @swagger
 * /api/v1/item/items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of all items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get("/items", getAllItems);

/**
 * @swagger
 * /api/v1/item/items/ByName:
 *   get:
 *     summary: Get an item by name
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the item
 *     responses:
 *       200:
 *         description: The item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
router.get("/items/ByName", getItemByName);

/**
 * @swagger
 * /api/v1/item/items/{id}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: The item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
router.get("/items/:id", getItemById);

/**
 * @swagger
 * /api/v1/item/items/category/{categoryId}:
 *   get:
 *     summary: Get items by category ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: List of items for the given category ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       404:
 *         description: Items not found
 */
router.get("/items/category/:categoryId", getItemsByCategoryId);

/**
 * @swagger
 * /api/v1/item/items/subcategory/{subcategoryId}:
 *   get:
 *     summary: Get items by subcategory ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: subcategoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory ID
 *     responses:
 *       200:
 *         description: List of items for the given subcategory ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       404:
 *         description: Items not found
 */
router.get("/items/subcategory/:subcategoryId", getItemsBySubcategoryId);

/**
 * @swagger
 * /api/v1/item/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - base_amount
 *               - total_amount
 *             properties:
 *               name:
 *                 type: string
 *                 description: The item name
 *               image_url:
 *                 type: string
 *                 format: binary
 *                 description: The URL of the item image
 *               description:
 *                 type: string
 *                 description: The description of the item
 *               tax_applicability:
 *                 type: boolean
 *                 description: Indicates if tax is applicable
 *               tax:
 *                 type: number
 *                 description: The tax amount, if applicable
 *               base_amount:
 *                 type: number
 *                 description: The base amount of the item
 *               discount:
 *                 type: number
 *                 description: The discount amount on the item
 *               total_amount:
 *                 type: number
 *                 description: The total amount of the item (Base - Discount)
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/items", upload.single('image_url'), createItem);

/**
 * @swagger
 * /api/v1/item/items/{id}:
 *   put:
 *     summary: Update an existing item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Item not found
 */
router.put("/items/:id", updateItem);

export default router;

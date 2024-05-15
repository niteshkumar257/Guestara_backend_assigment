import { client } from "../Db/dbconfig.js";
import { asyncHandler } from "../Utils/async_handler.js";
import CustomeError from "../Utils/cutsom_error.js";

export const getAllCategories = asyncHandler(async (req, res) => {
  const query_string = `select *from Category`;
  const data = await client.query(query_string);
  res.status(200).json({
    data: data.rows,
  });
});

export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const error = new CustomeError("Please send a valid id", 400);
    return next(error);
  }
  const query_string = `select * from Category where id=$1`;
  const data = await client.query(query_string, [id]);
  res.status(200).json({
    data: data.rows,
  });
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, image, description, tax_applicability, tax_type, tax } =
    req.body;
  console.log(name, image, description, tax_applicability, tax_type, tax);
  const query_string = `insert into Category (name, image_url, description, tax_applicability, tax_type, tax) values ($1,$2,$3,$4,$5,$6)`;
  await client.query(query_string, [
    name,
    image,
    description,
    tax_applicability,
    tax_type,
    tax,
  ]);
  res.status(201).json({
    message: "Category created Succesfully",
  });
});

// categoryController.js

export const updateCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const { name, image, description, tax_applicability, tax_type, tax } =
    req.body;

  if (!id) {
    const error = new CustomeError("Please provide a valid category ID", 400);
    return next(error);
  }

  let query_string = "update category set";

  const values = [];
  let param

  if (name) {
    query_string += " name = $1,";
    values.push(name);
  }
  if (image) {
    query_string += " image_url = $2,";
    values.push(image);
  }
  if (description) {
    query_string += " description = $3,";
    values.push(description);
  }
  if (tax_applicability !== undefined) {
    query_string += " tax_applicability = $4,";
    values.push(tax_applicability);
  }
  if (tax_type) {
    query_string += " tax_type = $5,";
    values.push(tax_type);
  }
  if (tax !== undefined) {
    query_string += " tax = $6,";
    values.push(tax);
  }

  // Remove the trailing comma from the SQL query
  query_string = query_string.slice(0, -1);

  // Add the WHERE clause to specify the category ID
  query_string += " WHERE id = $7";

  // Add the category ID to the values array
  values.push(id);

  // Execute the update query
  await client.query(query_string, values);

  res.json({ message: "Category updated successfully" });
});

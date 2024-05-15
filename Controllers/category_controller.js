import { client } from "../Db/dbconfig.js";
import { asyncHandler } from "../Utils/async_handler.js";
import CustomeError from "../Utils/cutsom_error.js";

// getAllCategory
export const getAllCategories = asyncHandler(async (req, res) => {
  const query_string = `select *from Category`;
  const data = await client.query(query_string);
  res.status(200).json({
    data: data.rows,
  });
});

// getCategoryById
export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { tax_applicability } = req.query;
  if (isNaN(id)) {
    const error = new CustomeError("Please send a valid id", 400);
    return next(error);
  }
  let query_string = `select * from Category where id=$1 `;
  let values = [];
  values.push(id);
  if (tax_applicability) {
    query_string += "and tax_applicability=$2";
    values.push(tax_applicability);
  }
  console.log(query_string);
  const data = await client.query(query_string, values);
  res.status(200).json({
    data: data.rows,
  });
});

// createCategory
export const createCategory = asyncHandler(async (req, res) => {
  const { name, image, description, tax_applicability, tax_type, tax } =
    req.body;

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

// updateCategory
export const updateCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const { name, image, description, tax_applicability, tax_type, tax } =
    req.body;

  if (isNaN(id)) {
    const error = new CustomeError("Please provide a valid category ID", 400);
    return next(error);
  }

  let query_string = "update category set";

  const values = [];
  let parameter_number = 1;

  if (name) {
    query_string += ` name = $${parameter_number++},`;
    values.push(name);
  }
  if (image) {
    query_string += ` image_url = $${parameter_number++},`;
    values.push(image);
  }
  if (description) {
    query_string += `description = $${parameter_number++},`;
    values.push(description);
  }
  if (tax_applicability !== undefined) {
    query_string += `tax_applicability = $${parameter_number++},`;
    values.push(tax_applicability);
  }
  if (tax_type) {
    query_string += ` tax_type = $${parameter_number++},`;
    values.push(tax_type);
  }
  if (tax) {
    query_string += ` tax = $${parameter_number++},`;
    values.push(tax);
  }

  query_string = query_string.slice(0, -1);

  query_string += ` WHERE id = $${parameter_number++}`;

  values.push(id);

  await client.query(query_string, values);

  res.json({ message: "Category updated successfully" });
});

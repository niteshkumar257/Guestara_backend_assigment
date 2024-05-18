import { asyncHandler } from "../Utils/async_handler.js";
import { client } from "../Db/dbconfig.js";
import CustomeError from "../Utils/cutsom_error.js";
export const getAllSubCategories = asyncHandler(async (req, res) => {
  const query_string = `select *from Subcategory`;
  const data = await client.query(query_string);
  res.status(200).json({
    data: data.rows,
  });
});
export const getSubCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query_string = `select * from Subcategory where id=$1`;
  const data = await client.query(query_string, [id]);
  
  if(data.rows.length==0)
    {
      return res.status(400).json({
         status:"error",
         message:"No Subcategory found"
      })
    }
  res.status(200).json({
    status:"sucess",
    data: data.rows,
  });
});
export const createSubCategory = asyncHandler(async (req, res) => {
  // Name: String
  // Image: URL
  // Description: String
  // Tax Applicability: Boolean, Default: Category tax applicability
  // Tax: Number, Default: Category tax number

  const { name, image, description, tax_applicability, tax, category_id } =
    req.body;

  const query_string = `insert into Subcategory (category_id,name, image_url, description, tax_applicability, tax) values ($1,$2,$3,$4,$5,$6)`;
  await client.query(query_string, [
    category_id,
    name,
    image,
    description,
    tax_applicability,
    tax,
  ]);
  res.status(201).json({
    message: "Subcategory created Succesfully",
  });
});
export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { name, image, description, tax_applicability, tax } = req.body;

  if (isNaN(id)) {
    const error = new CustomeError("Please provide a valid category ID", 400);
    return next(error);
  }
  const query_string_subcategory = `select *from Subcategory where id=$1`;
  const data = await client.query(query_string_subcategory, [id]);
  if (data.rows.length == 0) {
    return res.status(400).json({
      status: "fail",
      message: "No subcategory belong to this id",
    });
  }

  let query_string = "update Subcategory set";

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
  if (tax) {
    query_string += ` tax = $${parameter_number++},`;
    values.push(tax);
  }

  query_string = query_string.slice(0, -1);

  query_string += ` WHERE id = $${parameter_number++}`;

  values.push(id);

  await client.query(query_string, values);

  res.json({ message: "Subcategory updated successfully" });
});
export const getSubCategoryByCategoryId = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { tax_applicability } = req.query;

  const query_string = `select * from Subcategory where category_id=$1`;
  if (tax_applicability) {
    query_string += "and tax_applicability=$2";
    values.push(tax_applicability);
  }
  const data = await client.query(query_string, [categoryId]);
  if(data.rows.length==0)
    {
      return res.status(400).json({
        status:'error',
        message:'No Subcategory found'
      })
    }
  res.status(200).json({
    status:'success',
    data: data.rows,
  });
});

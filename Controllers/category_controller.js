import { client } from "../Db/dbconfig.js";
import { asyncHandler } from "../Utils/async_handler.js";
import CustomeError from "../Utils/cutsom_error.js";
import { uploadToCloudinary } from "../Utils/cloudinar_image_upload.js";

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

  const data = await client.query(query_string, values);
  if (data.rows.length == 0) {
    return res.status(400).json({
      status: "error",
      message: "No Category found ",
    });
  }
  res.status(200).json({
    status: "sucess",
    data: data.rows,
  });
});

// createCategory
export const createCategory = asyncHandler(async (req, res) => {
  // const { path } = req.file;

  // const image_url = await uploadToCloudinary({
  //   localImagepath: path,
  // });

  // console.log(image_url);

  // if (!image_url) {
  //   const error = new CustomeError("Image upload unsuccesfull", 400);
  //   return next(error);
  // }

  // Name: String
  // Image: URL
  // Description: String
  // Tax Applicability: Boolean
  // Tax: Number, if applicable
  // Tax type

  // Note as of now ,I implemented the code here to upload the image to the cloudinary and get the link of hosted image as response and store it in the database
  // but as we cannot send the formdata and body from the postman simultaneously so I just storing the dummy image url string directly in to the database

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
    status: "sucsess",
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
  const query_string_category = `select *from category where id=$1`;
  const data = await client.query(query_string_category, [id]);
  if (data.rows.length == 0) {
    return res.status(404).json({
      status: "fail",
      message: "No category belong to this id",
    });
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

  res(200).json({
    status: "success",
    message: "Category updated successfully",
  });
});

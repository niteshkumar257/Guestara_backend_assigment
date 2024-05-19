import { client } from "../Db/dbconfig.js";
import { asyncHandler } from "../Utils/async_handler.js";
import CustomeError from "../Utils/cutsom_error.js";
import { uploadToCloudinary } from "../Utils/cloudinar_image_upload.js";
export const getAllItems = asyncHandler(async (req, res) => {
  const query_string = `select * from item `;
  const data = await client.query(query_string);
  res.status(200).json({
    status: "sucess",
    item_list: data.rows,
  });
});

export const getItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query_string = `SELECT * FROM item WHERE id=$1`;
  const data = await client.query(query_string, [id]);

  if (data.rows.length == 0) {
    return res.status(400).json({
      status: "error",
      data: "No Items found",
    });
  }

  res.status(200).json({
    status: "success",
    item: data.rows[0], // Return the first item if exists
  });
});

export const createItem = asyncHandler(async (req, res, next) => {
  // Name: String
  // Image: URL
  // Description: String
  // Tax Applicability: Boolean
  // Tax: Number, if applicable
  // Base Amount: Number
  // Discount: Number
  // Total Amount: Number (Base - Discount)

  const { path } = req.file;

  const image_url = await uploadToCloudinary({
    localImagepath: path,
  });

  if (!image_url) {
    const error = new CustomeError("Image upload unsuccesfull", 400);
    return next(error);
  }

  const {
    name,
    image,
    description,
    tax_applicability,
    tax,
    base_amount,
    discount,
    total_amount,
    category_id,
    subcategory_id,
  } = req.body;
  const query_string_category_id=`select * from Category where id=$1`;
  const data=await client.query(query_string_category_id,[category_id]);
  if(data.rows.length==0)
    {
      const error = new CustomeError("Invalid category id no item found ", 400);
      return next(error);
    }

  if(subcategory_id)
    {
      const query_string_category_id=`select * from Subcategory where id=$1 and category_id=$2`;
  const data=await client.query(query_string_category_id,[subcategory_id,category_id]);
  if(data.rows.length==0)
    {
      const error = new CustomeError("Invalid category id or subcategory id no item found ", 400);
      return next(error);
    }

    }
  const query_string = `insert into item (category_id,subcategory_id,name, image_url, description, tax_applicability,tax,base_amount,discount,total_amount) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
  await client.query(query_string, [
    category_id,
    subcategory_id || null,
    name,
    image_url,
    description,
    tax_applicability,
    tax || null,
    base_amount,
    discount,
    total_amount,
  ]);
  res.status(201).json({
    message: "Item created Succesfully",
  });
});

export const updateItem = async (req, res) => {
  const id = req.params.id;

  const {
    name,
    image,
    description,
    tax_applicability,
    tax,
    base_amount,
    discount,
    total_amount,
  } = req.body;

  if (isNaN(id)) {
    const error = new CustomeError("Please provide a valid category ID", 400);
    return next(error);
  }
  let query_string_item = `select *from item where id=$1`;
  const data = await client.query(query_string_item, [id]);
  if (data.rows.length == 0) {
    return res.status(400).json({
      status: "fail",
      message: "No item belong to this id",
    });
  }
  let query_string = "update item set";

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
  if (base_amount) {
    query_string += ` base_amount = $${parameter_number++},`;
    values.push(base_amount);
  }
  if (discount) {
    query_string += ` discount = $${parameter_number++},`;
    values.push(discount);
  }
  if (total_amount) {
    query_string += ` total_amount = $${parameter_number++},`;
    values.push(total_amount);
  }

  query_string = query_string.slice(0, -1);

  query_string += ` WHERE id = $${parameter_number++}`;

  values.push(id);

  await client.query(query_string, values);

  res.json({ message: "Item updated successfully" });
};

export const getItemsByCategoryId = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const query_string = `select * from item where category_id=$1 `;
  const data = await client.query(query_string, [categoryId]);
  if (data.rows.length == 0) {
    return res.status(400).json({
      status: "error",
      data: "No Items found",
    });
  }
  res.status(200).json({
    status: "sucess",
    item_list: data.rows,
  });
});
export const getItemsBySubcategoryId = asyncHandler(async (req, res) => {
  const { subcategoryId } = req.params;
  const query_string = `select *from item where subcategory_id=$1`;
  const data = await client.query(query_string, [subcategoryId]);
  if (data.rows.length == 0) {
    return res.status(400).json({
      status: "error",
      data: "No Items found",
    });
  }
  res.status(200).json({
    status: "success",
    item_list: data.rows,
  });
});

export const getItemByName = asyncHandler(async (req, res) => {
  let { name } = req.query;
  name = String(name);

  const query_string = `select *from item where name=$1`;
  const data = await client.query(query_string, [name]);
  res.status(200).json({
    status: "success",
    item_list: data.rows,
  });
});

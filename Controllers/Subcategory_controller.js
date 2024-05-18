import {asyncHandler} from "../Utils/async_handler.js";
import {client} from "../Db/dbconfig.js";
export const getAllSubCategories =asyncHandler( async (req, res) => {
    const query_string=`select *from Subcategory`;
    const data=await client.query(query_string);
    res.status(200).json({
        data:data.rows
    })


});
export const getSubCategoryById = async (req, res) => {
  
};
export const createSubCategory = async (req, res) => {
   
};
export const updateSubCategory = async (req, res) => {
 
};


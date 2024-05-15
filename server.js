import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./Db/dbconfig.js";
import categoryRouter from "./Routes/category_routes.js";
import subCategoryRouter from "./Routes/subcategory_routes.js";
import itemsRouter from "./Routes/items_routes.js";
import errorHandler from "./Utils/error_middleware.js";
import CustomeError from "./Utils/cutsom_error.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// cors origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json({ limit: "16kb" })); // json body
app.use(express.urlencoded({ extended: true })); // to decode the url special character


// routes
app.use("/api/v1/category", categoryRouter);
app.use("api/v1/subcategory", subCategoryRouter);
app.use("/api/v1/items", itemsRouter);

app.all("*",(req,res,next)=>{
  // res.status(404).json({
  //   status:"fails",
  //   message:`No route found ${req.originalUrl}`
  // })
  // const error=new Error(`no router out there ${req.originalUrl}`);
  // error.status=404;

  const error=new CustomeError(`no router out there ${req.originalUrl}`,404)
  next(error);

})

// error handling 
app.use(errorHandler)



// connect database
connectDb()
  .then(() => {
    // Start the server
    console.log("connected to db");
    app.listen(port, () => {
      console.log("Server connected", port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });

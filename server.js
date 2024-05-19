import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./Db/dbconfig.js";
import categoryRouter from "./Routes/category_routes.js";
import subCategoryRouter from "./Routes/subcategory_routes.js";
import itemsRouter from "./Routes/items_routes.js";
import errorHandler from "./Utils/error_middleware.js";
import CustomeError from "./Utils/cutsom_error.js";
import {specs,options} from "./swagger.js"
import swaggerUi from "swagger-ui-express";



dotenv.config();
// dotenv configuration

const app = express();
const port = process.env.PORT || 8000;

// cors origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
  // all origins are allowed
);

app.use(express.json({ limit: "16kb" })); // json body
app.use(express.urlencoded({ extended: true })); // to decode the url special character
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// routes
app.get("/",(req,res)=>{
    res.status(200).json("Back-end Api's")
})
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subcategory", subCategoryRouter);
app.use("/api/v1/item", itemsRouter);

// to handle all invalid routes
app.all("*", (req, res, next) => {
  const error = new CustomeError(`no router out there ${req.originalUrl}`, 404);
  next(error);
});

// error handling
app.use(errorHandler);

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

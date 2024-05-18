import pg from "pg";
import dotenv from "dotenv";
dotenv.config();


const { Client } = pg;
const client = new Client({
  user:process.env.PG_USER_NAME,
  password: process.env.PG_HOSTED_PASSWORD,
  host: process.env.PG_HOST_NAME,
  port: process.env.PG_HOST_PORT,
  database:process.env.PG_USER_DATABASE,
  ssl:true
 
});

const connectDb = async () => {
  try {
   let res= await client.connect();
   console.log(res);
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
    console.error("Error connecting to the database:", error.message);
  }
};

export {client,connectDb}

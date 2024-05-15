import pg from "pg";

const { Client } = pg;
const client = new Client({
  user: "postgres",
  password: "nitesh",
  host: "localhost",
  port: "5432",
  database: "guestara",
});

const connectDb = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

export {client,connectDb}

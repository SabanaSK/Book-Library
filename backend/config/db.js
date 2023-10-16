import mysql from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  })
  .promise();

const result = await pool.query("SELECT * FROM postsbook");

console.log(result);

export default pool;

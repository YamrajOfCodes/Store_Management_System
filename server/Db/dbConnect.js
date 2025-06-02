import mysql from "mysql2/promise";

// Create the pool once and reuse it
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default pool;

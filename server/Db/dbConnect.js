import mysql from "mysql2/promise";

// Create the pool once and reuse it
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Kundan@123",
  database: "ratingManageDb",
});

export default pool;

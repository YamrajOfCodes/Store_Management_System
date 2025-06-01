import pool from "../../Db/dbConnect.js";

const createTables = async () => {
  try {
    // 1. Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        address VARCHAR(200),
        role VARCHAR(100)
      );
    `);

    // 2. Create stores table (depends on users)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS stores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        storename VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address VARCHAR(255),
        rating FLOAT DEFAULT 0,
        total_reviews INT DEFAULT 0
      );
    `);

    // 3. Create store_reviews table (depends on stores and users)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS store_reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        store_id INT NOT NULL,
        user_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
        review TEXT
      );
    `);

    console.log("✅ Tables created successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating tables:", err);
    process.exit(1);
  }
};

export default createTables;

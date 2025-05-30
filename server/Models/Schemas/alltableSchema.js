import pool from "../../Db/dbConnect.js";


const createTables = async () => {
  try {
    // await pool.query(`
    //     CREATE TABLE IF NOT EXISTS user (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     username VARCHAR(100),
    //     email VARCHAR(255) UNIQUE,
    //     password VARCHAR(255),
    //     address VARCHAR(200),
    //     role VARCHAR(10)
    //   )
    // `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS store (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        storename VARCHAR(255),
        address VARCHAR(100),
        rating INT,
        rating_counter INT 
      )
    `);

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS admin (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     email VARCHAR(255) UNIQUE,
    //     admin_name VARCHAR(255),
    //     address VARCHAR(100),
    //     password VARCHAR(100),
    //     role VARCHAR(10)
    //   )
    // `);

    console.log("✅ Tables created successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating tables:", err);
    process.exit(1);
  }
};

export default createTables

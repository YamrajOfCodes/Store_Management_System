import pool from "../../Db/dbConnect.js";
import bcrypt from "bcrypt";

import createTables from "../../Models/Schemas/alltableSchema.js";

// createTables();


 export const addUser = async(req,res)=>{
 
     const { username, email, password, address, role  } = req.body;

     console.log(username); // kundan


    try {
        
        if(!username || !email || !address || !password){
           return res.status(400).json({error:"all the fields are required"});
        }

       const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
       if (existing.length > 0) {
       return res.status(409).json({ message: "user already exists." });
       }

        const hashedPassword = await bcrypt.hash(password, 10);

  
       await pool.query("INSERT INTO users (username, email, password,address,role) VALUES (?, ?,?,?,?)", [username,email,hashedPassword,address,role]);

        return res.status(201).json({ message: " user created successfully." });

        
    } catch (error) {
        console.log(error);
        
    }
}

export const addStore = async(req,res)=>{
    const {storename,email,address,rating} = req.body;

    try {
         try {
        
        if(!storename || !email || !address){
           return res.status(400).json({error:"all the fields are required"});
        }

       const [existing] = await pool.query("SELECT * FROM store WHERE email = ?", [email]);
       if (existing.length > 0) {
       return res.status(409).json({ message: "store is already exists." });
       }
  
       await pool.query("INSERT INTO store (storename, email,address,rating,rating_counter) VALUES (?, ?,?,?,?)", [storename,email,address,rating,"0"]);

        return res.status(201).json({ message: "Store created successfully." });

        
    } catch (error) {
        console.log(error);
        
    }
    } catch (error) {
        console.log(error);
        
    }
}


 export const addAdmin = async(req,res)=>{

    const {username,email,address,password,role} = req.body;

    console.log(req.body);
    

    try {
        
        if(!username || !email || !address || !password){
           return res.status(400).json({error:"all the fields are required"});
        }

       const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
       if (existing.length > 0) {
       return res.status(409).json({ message: "admin already exists." });
       }

        const hashedPassword = await bcrypt.hash(password, 10);

  
       await pool.query("INSERT INTO users (username, email, password,address,role) VALUES (?, ?,?,?,?)", [username,email,hashedPassword,address,role]);

        return res.status(201).json({ message: "admin created successfully." });

        
    } catch (error) {
        console.log(error);
        
    }
}

export const getallusers = async(req,res)=>{
    try {
        const [existing] = await pool.query("SELECT * FROM users");
        return res.status(200).json(existing);
        
    } catch (error) {
        console.log(error);
        
    }
}


export const getallstores = async(req,res)=>{
    try {
        const [existing] = await pool.query("SELECT * FROM store");
        return res.status(200).json(existing);
        
    } catch (error) {
        console.log(error);
        
    }
}

export const getadmin = async(req,res)=>{
   try {
        const [existing] = await pool.query("SELECT * FROM users");
        return res.status(200).json(existing);
        
    } catch (error) {
        console.log(error);
        
    }
}



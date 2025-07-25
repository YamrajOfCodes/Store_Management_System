import pool from "../../Db/dbConnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const ADMINSECRET=process.env.SECRET;

// import createTables from "../../Models/Schemas/alltableSchema.js";

// createTables();


 export const addUser = async(req,res)=>{
 
     let { username, email, password, address, role  } = req.body;

     console.log(role); // kundan

    if(role == null){
      role = "user";
    }


    try {
        
        if(!username || !email || !address || !password){
           return res.status(400).json({error:"all the fields are required"});
        }

       const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
       if (existing.length > 0) {
       return res.status(409).json({ error: "user already exists." });
       }

        const hashedPassword = await bcrypt.hash(password, 10);

  
       await pool.query("INSERT INTO users (username, email, password,address,role) VALUES (?, ?,?,?,?)", [username,email,hashedPassword,address,role]);

        return res.status(200).json({ message: " user created successfully." });

        
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

       const [existing] = await pool.query("SELECT * FROM stores WHERE email = ?", [email]);
       if (existing.length > 0) {
       return res.status(409).json({ message: "store is already exists." });
       }
  
       await pool.query("INSERT INTO stores (storename, email,address,rating,total_reviews) VALUES (?, ?,?,?,?)", [storename,email,address,rating,"0"]);

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
       return res.status(409).json({ error: "admin already exists." });
       }

        const hashedPassword = await bcrypt.hash(password, 10);

  
       await pool.query("INSERT INTO users (username, email, password,address,role) VALUES (?, ?,?,?,?)", [username,email,hashedPassword,address,role]);

        return res.status(201).json({ message: "admin created successfully." });

        
    } catch (error) {
        console.log(error);
        
    }
}


export const adminLogin = async(req,res)=>{
 const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email ' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT Token (example secret: "your_jwt_secret")
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      ADMINSECRET,
      { expiresIn: '4h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
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
        const [existing] = await pool.query("SELECT * FROM stores");
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

export const deleteUser = async(req,res)=>{

   const {userId}  = req.params

   try {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
    return res.status(200).json({result});
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}



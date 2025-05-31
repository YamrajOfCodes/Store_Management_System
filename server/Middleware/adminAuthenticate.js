const ADMINSECRET="dhsjdh879";
import jwt from "jsonwebtoken";
import pool from "../Db/dbConnect.js";

const adminauthenticate = async(req,res,next)=>{
  
    const token = req.headers.authorization;
    
    // console.log(token);
    const verifyToken = jwt.verify(token,ADMINSECRET);

    if(!verifyToken){
        return res.status(400).json({error:"You do not autherity"});
    }
    

     const [rootUser] = await pool.query("SELECT * FROM users WHERE id = ?", [verifyToken._id]);
    
    if(!rootUser){throw new Error("user not found")}

    req.token = token
    req.rootUser = rootUser
    req.userId = rootUser._id

    next();

   
} 



export default adminauthenticate
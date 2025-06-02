const SECRET=process.env.SECRET;
import jwt from "jsonwebtoken";
import pool from "../Db/dbConnect.js";

const authenticate = async(req,res,next)=>{
  
    const token = req.headers.authorization;
    
    // console.log(token);
    const verifyToken = jwt.verify(token,SECRET);

    if(!verifyToken){
        return res.status(400).json({error:"You do not autherity"});
    }

    
    
    
    const [rootUser] = await pool.query("SELECT * FROM users WHERE id = ?", [verifyToken.id]);
    
    // console.log(rootUser);
    if(!rootUser){throw new Error("user not found")}

    req.token = token
    req.rootUser = rootUser
    req.userId = rootUser.id

    

    next();

   
} 



export default authenticate
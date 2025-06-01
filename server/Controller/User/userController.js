import db from "../../Db/dbConnect.js";
import bcrypt from "bcrypt"


export const userverify = async(req,res)=>{

    try {

    // console.log(req.rootUser[0]?.id);
    
     
     
      
        
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [req.rootUser?.[0].id]);
       

        if(user){
            res.status(200).json(user)
        }else{
            res.status(400).json({error:"invalid admin"})
        }

    } catch (error) {
        console.log(error);
    }


}



export const review = async (req, res) => {
  const { storeId, userId, rating, review } = req.body;

  if (!storeId || !userId || !rating) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    // Check if review already exists by this user for the store
    const [existing] = await db.query(
      "SELECT id FROM store_reviews WHERE store_id = ? AND user_id = ?",
      [storeId, userId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Review already given." });
    }

    // Insert the new review
    await db.query(
      "INSERT INTO store_reviews (store_id, user_id, rating, review) VALUES (?, ?, ?, ?)",
      [storeId, userId, rating, review]
    );

    // Calculate new average rating and total reviews for the store
    const [result] = await db.query(
      "SELECT AVG(rating) AS avgRating, COUNT(*) AS totalReviews FROM store_reviews WHERE store_id = ?",
      [storeId]
    );

    const avgRating = parseFloat(result[0].avgRating).toFixed(2);
    const totalReviews = result[0].totalReviews;

    // Update the store's rating and total_reviews
    await db.query(
      "UPDATE stores SET rating = ?, total_reviews = ? WHERE id = ?",
      [avgRating, totalReviews, storeId]
    );

    res.json({ success: true, avgRating, totalReviews });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Database error" });
  }
};

export const getReview = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT store_id, AVG(rating) AS avgRating, COUNT(*) AS totalReviews 
       FROM store_reviews 
       GROUP BY store_id`
    );

    const formattedResult = rows.map((row) => ({
      storeId: row.store_id,
      avgRating: parseFloat(row.avgRating || 0).toFixed(2),
      totalReviews: row.totalReviews
    }));

    return res.json({ success: true, data: formattedResult });
  } catch (error) {
    console.error("Error while getting review info", error);
    return res.status(500).json({ error: "Database error" });
  }
};

export const getStore = async(req,res)=>{
 

  const {email} = req.body;
 

  if(!email){
    return res.status(400).json({error:"email is required"});
  }

  try {
      const [store] = await db.query(
      "SELECT * FROM stores WHERE email = ?",
      [email]
    );

    if(store){
      return res.status(200).json(store)
    }
  
    return res.status(400).json({error:"Store are not present"});

  } catch (error) {
    console.log("error while fetching store details");
    
  }


}

export const getallReviews = async(req,res)=>{
  try {
     const [store] = await db.query(
      "SELECT * FROM  store_reviews"
    );
    return res.status(200).json(store);
  } catch (error) {
    console.log(error);
    
  }
}

export const changePassword = async(req,res)=>{
   const { userId, oldPassword, newPassword } = req.body;

  try {
    // 1. Fetch user from DB
    const [rows] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = rows[0].password;

    // 2. Compare old password
    const isMatch = await bcrypt.compare(oldPassword, hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    // 3. Hash new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update password in DB
    await db.query('UPDATE users SET password = ? WHERE id = ?', [newHashedPassword, userId]);

   return res.json({ message: 'Password changed successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

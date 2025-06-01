import express from "express";
import { changePassword, getallReviews, getReview, getStore, review, userverify } from "../../Controller/User/userController.js";
import authenticate from "../../Middleware/adminAuthenticate.js";
const router = express.Router();

router.post("/review",review);
router.get("/userverify",authenticate,userverify);
router.get("/getreview",getReview)
router.post("/getstore",getStore);
router.get("/getallreviews",getallReviews);

router.put("/change-password",changePassword)

export default router;
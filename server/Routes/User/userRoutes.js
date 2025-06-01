import express from "express";
import { getReview, review, userverify } from "../../Controller/User/userController.js";
import authenticate from "../../Middleware/adminAuthenticate.js";
const router = express.Router();

router.post("/review",review);
router.get("/userverify",authenticate,userverify);
router.get("/getreview",getReview)

export default router;
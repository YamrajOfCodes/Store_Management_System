import express from "express";
const router = express.Router();
import {addAdmin, addStore, addUser, adminLogin, deleteUser, getadmin, getallstores, getallusers} from "../../Controller/Admin/admincontroller.js"
import authenticate from "../../Middleware/adminAuthenticate.js";

router.post("/adduser",addUser);
router.post("/addstore",authenticate,addStore);
router.post("/addadmin",authenticate,addAdmin);
router.post("/adminlogin",adminLogin);


router.get("/getallusers",getallusers);
router.get("/getallstores",getallstores);
router.get("/getadmins",getadmin);

router.delete("/deleteuser/:userId",authenticate,deleteUser)

export default router;
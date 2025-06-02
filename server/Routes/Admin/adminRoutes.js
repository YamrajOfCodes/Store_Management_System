import express from "express";
const router = express.Router();
import {addAdmin, addStore, addUser, adminLogin, deleteUser, getadmin, getallstores, getallusers} from "../../Controller/Admin/admincontroller.js"
import authenticate from "../../Middleware/adminAuthenticate.js";

router.post("/adduser",addUser);
router.post("/addstore",addStore);
router.post("/addadmin",addAdmin);
router.post("/adminlogin",adminLogin);


router.get("/getallusers",getallusers);
router.get("/getallstores",getallstores);
router.get("/getadmins",getadmin);

router.delete("/deleteuser/:userId",deleteUser)

export default router;
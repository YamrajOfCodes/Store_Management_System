import express from "express";
const router = express.Router();
import {addAdmin, addStore, addUser, adminLogin, getadmin, getallstores, getallusers} from "../../Controller/Admin/admincontroller.js"
import adminauthenticate from "../../Middleware/adminAuthenticate.js";

router.post("/adduser",adminauthenticate,addUser);
router.post("/addstore",addStore);
router.post("/addadmin",addAdmin);
router.post("/adminlogin",adminLogin);


router.get("/getallusers",getallusers);
router.get("/getallstores",getallstores);
router.get("/getadmins",getadmin);

export default router;
import express from "express";
const router = express.Router();
import {addAdmin, addStore, addUser, getallstores, getallusers} from "../../Controller/Admin/admincontroller.js"

router.post("/adduser",addUser);
router.post("/addstore",addStore);
router.post("/addadmin",addAdmin);


router.get("/getallusers",getallusers);
router.get("/getallstores",getallstores);

export default router;
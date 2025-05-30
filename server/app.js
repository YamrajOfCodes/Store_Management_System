import express from "express";
import DbConnect from "./Db/dbConnect.js";
const app = express();
app.use(express.json());

import AdminRouter from "./Routes/Admin/adminRoutes.js";
app.use("/admin/api",AdminRouter);



app.listen(4000,()=>{
    console.log("server is listening");
    
})
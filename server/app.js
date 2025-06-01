import express from "express";
import DbConnect from "./Db/dbConnect.js";
const app = express();
app.use(express.json());
import cors from "cors";

app.use(cors("*"));

import AdminRouter from "./Routes/Admin/adminRoutes.js";
app.use("/admin/api",AdminRouter);

import userRouter from "./Routes/User/userRoutes.js";
app.use("/user/api",userRouter);



app.listen(4000,()=>{
    console.log("server is listening");
    
})
import {configureStore} from "@reduxjs/toolkit";
import adminSlice from "../Slice/AdminSlice/adminSlice";
import userSlice from "../Slice/UserSlice/userSlice";
const store = configureStore({
     reducer:{
        user:adminSlice,
        user2:userSlice
     }
});

export default store
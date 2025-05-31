import {configureStore} from "@reduxjs/toolkit";
import userSlice from "../Slice/UserSlice/userSlice";
import postSlice from "../Slice/postSlice/postSlice";

const store = configureStore({
     reducer:{
        user:userSlice,
        post:postSlice
     }
});

export default store
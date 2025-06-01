import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import { addreviewAPI, getReviewAPI, userVerifyAPI } from "../../../API/userAPI/userAPI";



export const addReview = createAsyncThunk("addreview",async(data)=>{
    try {
        
        const response = await addreviewAPI(data);
        console.log(response);
        if(response.status == 200){
            toast.success("review added");
            return response.data;
        }else{
            toast.error(response.response.data.error);
            
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const userVerify = createAsyncThunk("userverify",async()=>{
    try {
        
        const response = await userVerifyAPI();
        if(response.status == 200){
            return response.data;
        }else{
            toast.error(response.response.data.error);
            
        }
    } catch (error) {
        console.log(error);
        
    }
})



export const getReview = createAsyncThunk("getreview",async()=>{
    try {
        
        const response = await getReviewAPI();
        if(response.status == 200){
            return response.data;
        }else{
            toast.error(response.response.data.error);
            
        }
    } catch (error) {
        console.log(error);
        
    }
})








  const userSlice  = createSlice({
    name:"userslice",
    initialState:{
        addreview:[],
        getreview:[],
        userverify:[],
        getreview:[],
        loader:false,
        error:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(addReview.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(addReview.fulfilled,(state,action)=>{
            state.loader = false,
            state.addreview = [action.payload]
        })
        .addCase(addReview.rejected,(state,action)=>{
            state.error = [action.payload]
        })

        builder.addCase(userVerify.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(userVerify.fulfilled,(state,action)=>{
            state.loader = false,
            state.userverify = [action.payload]
        })
        .addCase(userVerify.rejected,(state,action)=>{
            state.error = [action.payload]
        })



        builder.addCase(getReview.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getReview.fulfilled,(state,action)=>{
            state.loader = false,
            state.getreview = [action.payload]
        })
        .addCase(getReview.rejected,(state,action)=>{
            state.error = [action.payload]
        })




        

    }
})

export default userSlice.reducer;
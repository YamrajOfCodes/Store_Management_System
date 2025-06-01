import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import { addreviewAPI, changePasswordAPI, getallreviewsAPI, getReviewAPI, getStoreAPI, userVerifyAPI } from "../../../API/userAPI/userAPI";



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


export const getStore = createAsyncThunk("getstore",async(data)=>{
    try {
       
        
        const response = await getStoreAPI(data);
        if(response.status == 200){
            return response.data;
        }else{
            toast.error(response.response.data.error);
            
        }
    } catch (error) {
        console.log(error);
        
    }
})



export const getAllReviews = createAsyncThunk("getallreviews",async()=>{
    try {
       
        const response = await getallreviewsAPI();
        if(response.status == 200){
            return response.data;
        }else{
            toast.error(response.response.data.error);
            
        }
    } catch (error) {
        console.log(error);
        
    }
})
export const ChangePassword = createAsyncThunk("changepassword",async(data)=>{
    try {
       
        
        const response = await changePasswordAPI(data);
        if(response.status == 200){
            toast.success("password change successfully");
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
        getstore:[],
        getallreviews:[],
        changepassword:[],
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


        //getStore

        
        builder.addCase(getStore.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getStore.fulfilled,(state,action)=>{
            state.loader = false,
            state.getstore = [action.payload]
        })
        .addCase(getStore.rejected,(state,action)=>{
            state.error = [action.payload]
        })


    // getallreviews

       builder.addCase(getAllReviews.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getAllReviews.fulfilled,(state,action)=>{
            state.loader = false,
            state.getallreviews = [action.payload]
        })
        .addCase(getAllReviews.rejected,(state,action)=>{
            state.error = [action.payload]
        })


         builder.addCase(ChangePassword.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(ChangePassword.fulfilled,(state,action)=>{
            state.loader = false,
            state.changepassword = [action.payload]
        })
        .addCase(ChangePassword.rejected,(state,action)=>{
            state.error = [action.payload]
        })






        

    }
})

export default userSlice.reducer;
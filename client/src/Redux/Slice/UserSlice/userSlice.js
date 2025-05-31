import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { addAdminAPI, addstoreAPI, getAdminAPI, getallstoresAPI, getallusersAPI, registerAPI, universalLoginAPI } from "../../../API/adminAPI/userAPI";
import {toast} from "react-toastify"



export const Register = createAsyncThunk("register",async(data)=>{
    try {
        
        const response = await registerAPI(data);
        console.log(response);
        if(response.status == 200){
            toast.success("Register successful");
            return response.data;
        }else{
            toast.error(response.response.data.error);
            
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const addStore = createAsyncThunk("addstore",async(data)=>{
    try {
        const response  = await addstoreAPI(data);
        if(response.status==200){
            toast.success("store add successfull");
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const addAdmin = createAsyncThunk("addadmin",async(data)=>{
    try {
        console.log(data);
        
        const response  = await addAdminAPI(data);
        if(response.status==200){
            toast.success("admin added successfull");
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const getallUsers = createAsyncThunk("getallusers",async()=>{
    try {
        const response = await getallusersAPI();
        
        if(response.status==200){
            return response.data;
        }else{
           return response.data
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const getallStores = createAsyncThunk("getallstores",async()=>{
     try {
        const response = await getallstoresAPI();
        
        if(response.status==200){
            return response.data;
        }else{
           return response.data
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const getAdmin = createAsyncThunk("getadmin",async()=>{
    try {
        const response = await getAdminAPI();
        
        if(response.status==200){
            return response.data;
        }else{
           return response.data
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const Login = createAsyncThunk("login",async(data)=>{
    try {
        const response = await universalLoginAPI(data);
        
        if(response.status==200){
            localStorage.setItem("adminToken", response.data.token)
            return response.data;
        }else{
           return response.data
        }
    } catch (error) {
        console.log(error);
        
    }
})







  const userSlice  = createSlice({
    name:"userSlice",
    initialState:{
        register:[],
        addstore:[],
        addadmin:[],
        getadmin:[],
        getallusers:[],
        getallstores:[],
        login:[],
        loader:false,
        error:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(Register.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(Register.fulfilled,(state,action)=>{
            state.loader = false,
            state.register = [action.payload]
        })
        .addCase(Register.rejected,(state,action)=>{
            state.error = [action.payload]
        })

        builder.addCase(addStore.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(addStore.fulfilled,(state,action)=>{
            // state.loader = false,
            // state.login = [action.payload]
            state.loader = false;
            state.addstore = [action.payload];
        })
        .addCase(addStore.rejected,(state,action)=>{
            state.error = [action.payload]
        })



        builder.addCase(addAdmin.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(addAdmin.fulfilled,(state,action)=>{
            state.loader = false,
            state.addadmin = [action.payload]
        })
        .addCase(addAdmin.rejected,(state,action)=>{
            state.error = [action.payload]
        })



        builder.addCase(getallUsers.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getallUsers.fulfilled,(state,action)=>{
            state.loader = false,
            state.getallusers = [action.payload]
        })
        .addCase(getallUsers.rejected,(state,action)=>{
            state.error = [action.payload]
        })


        builder.addCase(getAdmin.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getAdmin.fulfilled,(state,action)=>{
            state.loader = false,
            state.getadmin = [action.payload]
        })
        .addCase(getAdmin.rejected,(state,action)=>{
            state.error = [action.payload]
        })


        builder.addCase(getallStores.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getallStores.fulfilled,(state,action)=>{
            state.loader = false,
            state.getallstores = [action.payload]
        })
        .addCase(getallStores.rejected,(state,action)=>{
            state.error = [action.payload]
        })

        // Login 

          builder.addCase(Login.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(Login.fulfilled,(state,action)=>{
            state.loader = false,
            state.login = [action.payload]
        })
        .addCase(Login.rejected,(state,action)=>{
            state.error = [action.payload]
        })




    }
})

export default userSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { addlikeAPI, createPostAPI, deletepostAPI, getpostsAPI, getsinglepostsAPI, removelikeAPI } from "../../../API/postAPI/postAPI";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { addCommentAPI, getcommentsAPI } from "../../../API/CommentsAPi/CommentApi";





export const getallPosts = createAsyncThunk("posts",async()=>{
    try {
        const response  = await getpostsAPI();
        
        if(response.status == 200){
            return response.data
        }else{
            return response.data
            
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const getsinglePost = createAsyncThunk("singleposts",async(data)=>{
    try {
        const response = await getsinglepostsAPI(data);
        if(response.status == 200){
            return response.data
        }else{
            return response.data
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const Createpost = createAsyncThunk("createpost",async(data)=>{
    try {
        const response = await createPostAPI(data.data,data.config);
        console.log(response);
        
        if(response.status == 200){
            toast.success("post created successfully");
            return response.data
        }else{
            console.log("error while post creating");
            toast.error(response.response.data.error)
            
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const deletePost = createAsyncThunk("deletepost",async(data)=>{
    try {
        console.log(data);
        
        const response  = await deletepostAPI(data);
        if(response.status==200){
            Navigate("/");
         toast.success("post deleted")
         return response.data;
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const addLike = createAsyncThunk("addlike",async(data)=>{
    try {
        const response = await addlikeAPI([data.id,data.name]);
        if(response.status==200){
            return response.data
        }else{
            console.log(response);
            return response.data
            
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const removeLike = createAsyncThunk("removelike",async(data)=>{
    try {
        const response = await removelikeAPI([data.id,data.name]);
        if(response.status==200){
            console.log("like removed");
            return response.data
        }
    } catch (error) {
        console.log(error);
        
    }
})


//CommentsSlice

export const addComment = createAsyncThunk("addcomment",async(data)=>{
    try {
        const response = await addCommentAPI(data);
        if(response.status===200){
            return response.data
        }else{
            return response.data
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const getComment = createAsyncThunk("getcomments",async(data)=>{
    try {
        // console.log(data);
        
        const response = await getcommentsAPI(data);
        // console.log(response);
        
        if(response.status == 200){
            return response.data
        }else{
            return response.data;
        }
    } catch (error) {
        console.log(error);
        
    }
})








export const postSlice = createSlice({
    name:'postSlice',
    initialState:{
        posts:[],
        singlepost:[],
        createpost:[],
        deletepost:[],
        likes:[],
        removelike:[],
        addcomment:[],
        getcomments:[],
        error:null,
        loader:false
    },
    extraReducers:(buliders)=>{
        buliders.addCase(getallPosts.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getallPosts.fulfilled,(state,action)=>{
            state.posts = [action.payload]
        })
        .addCase(getallPosts.rejected,(state,action)=>{
            state.error = action.payload
        })
        buliders.addCase(getsinglePost.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getsinglePost.fulfilled,(state,action)=>{
            state.singlepost = [action.payload]
        })
        .addCase(getsinglePost.rejected,(state,action)=>{
            state.error = action.payload
        })
        buliders.addCase(Createpost.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(Createpost.fulfilled,(state,action)=>{
            state.createpost = [action.payload]
        })
        .addCase(Createpost.rejected,(state,action)=>{
            state.error = action.payload
        })
        buliders.addCase(deletePost.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            state.deletepost = [action.payload]
        })
        .addCase(deletePost.rejected,(state,action)=>{
            state.error = action.payload
        })
        buliders.addCase(addLike.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(addLike.fulfilled,(state,action)=>{
            state.likes = action.payload
            state.removelike=[]
        })
        .addCase(addLike.rejected,(state,action)=>{
            state.error = action.payload
        })
        buliders.addCase(removeLike.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(removeLike.fulfilled,(state,action)=>{
            state.removelike = action.payload
            state.likes = []
        })
        .addCase(removeLike.rejected,(state,action)=>{
            state.error = action.payload
        })

        //comments

        buliders.addCase(getComment.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getComment.fulfilled,(state,action)=>{
            state.getcomments = action.payload
        })
        .addCase(getComment.rejected,(state,action)=>{
            state.error = action.payload
        })
        buliders.addCase(addComment.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(addComment.fulfilled,(state,action)=>{
            state.addcomment = action.payload
        })
        .addCase(addComment.rejected,(state,action)=>{
            state.error = action.payload
        })
    }
})

export default postSlice.reducer;
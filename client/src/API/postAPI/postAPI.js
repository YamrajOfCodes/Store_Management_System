import { commonrequest } from "../commonrequest"
import {BASE_URL} from "../helper"

export const createPostAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/post/api/createpost`,data,header,"user");
}

export const getpostsAPI = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/post/api/getposts`,{},header,"admin")
}

export const getsinglepostsAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/post/api/getsinglepost/${data}`,{},header,"admin")
}

export const deletepostAPI = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/post/api/deletepost/${data}`,{},header,"user");
}

export const addlikeAPI = async(data,header)=>{
    const [id,name]=data;
    
    return await commonrequest("POST",`${BASE_URL}/post/api/addlike/${id}`,{name},header,"user");
}

export const removelikeAPI = async(data,header)=>{
    const [id,name]=data;
    
    return await commonrequest("POST",`${BASE_URL}/post/api/removelike/${id}`,{name},header,"user");
}

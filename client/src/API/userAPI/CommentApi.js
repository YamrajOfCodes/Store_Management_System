import { commonrequest } from "../commonrequest"
import { BASE_URL } from "../helper"



export const addCommentAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/post/api/addcomment/${data.id}`,data,header,"user");
}

export const getcommentsAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/post/api/getcomments/${data}`,{},header,"user");
} 
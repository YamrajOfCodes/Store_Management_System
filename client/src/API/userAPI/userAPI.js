import { commonrequest } from "../commonrequest"
import {BASE_URL} from "../helper"

export const addreviewAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/api/review`,data,header,"user");
}

export const userVerifyAPI = async(data,header)=>{ 
    return await commonrequest("GET",`${BASE_URL}/user/api/userverify`,"",header,"user");
}

export const getReviewAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/user/api/getreview`,"",header,"");
}
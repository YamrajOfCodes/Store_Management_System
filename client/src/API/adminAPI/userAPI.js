import { commonrequest } from "../commonrequest"
import {BASE_URL} from "../helper"

export const registerAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/admin/api/adduser`,data,header,"user");
}

export const addstoreAPI = async(data,header)=>{  
    return await commonrequest("POST",`${BASE_URL}/admin/api/addstore`,data,header,"user");
}


export const addAdminAPI = async(data,header)=>{  
    return await commonrequest("POST",`${BASE_URL}/admin/api/addadmin`,data,header,"user");
}


export const getallusersAPI = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/admin/api/getallusers`,"",header,"user")
}

export const getallstoresAPI = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/admin/api/getallstores`,"",header,"user")
}

export const getAdminAPI = async(data,header)=>{  
    return await commonrequest("GET",`${BASE_URL}/admin/api/getadmins`,data,header,"user");
}
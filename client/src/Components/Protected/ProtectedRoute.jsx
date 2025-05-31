// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Login } from '../../Redux/Slice/UserSlice/userSlice';

export default function ProtectedRoute({ children, requiredRole }) {
    
     const dispatch = useDispatch();
     const {login} = useSelector((state)=>state.user);
     console.log(login);
     

     useEffect(()=>{
      dispatch(Login)
     },[]);
    
     const adminToken = localStorage.getItem("adminToken");

     if(adminToken){
        return children
     }else{
        <>
        <h1>redirect</h1>
        </>
     }
}

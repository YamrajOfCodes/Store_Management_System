import React from 'react'
import "./App.css"
import AdminDashboard from './Components/Admin/AdminDashboard'
import AuthPage from './pages/loginSignup/Loginsignup'
import {Routes,Route} from "react-router-dom"
import StoreListpage from './pages/StoreLists/StoreListpage'
import ProtectedRoute from './Components/Protected/ProtectedRoute'

const App = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<AuthPage/>}/>    
    <Route path='/dashboard' element={<ProtectedRoute requiredRole='admin'><AdminDashboard/></ProtectedRoute>}/> 
    <Route path='/store' element={<StoreListpage/>}/>     
    </Routes>
    </div>
  )
}

export default App

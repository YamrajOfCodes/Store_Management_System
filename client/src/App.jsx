import React from 'react'
import "./App.css"
import AdminDashboard from './Components/Admin/AdminDashboard'
import AuthPage from './pages/loginSignup/Loginsignup'
import {Routes,Route} from "react-router-dom"
import ProtectedRoute from './Components/Protected/ProtectedRoute'
import StorePage from './pages/StoreLists/Storepage'

const App = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<AuthPage/>}/>    
    <Route path='/dashboard' element={<ProtectedRoute requiredRole='admin'><AdminDashboard/></ProtectedRoute>}/> 
    <Route path='/store' element={<StorePage/>}/>     
    </Routes>
    </div>
  )
}

export default App

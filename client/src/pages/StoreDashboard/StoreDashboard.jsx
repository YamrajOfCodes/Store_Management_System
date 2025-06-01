import React, { useEffect, useState } from 'react';
import { User, Star, Lock, LogOut, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChangePassword, getAllReviews, getReview, getStore, userVerify } from '../../Redux/Slice/UserSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getallUsers } from '../../Redux/Slice/AdminSlice/adminSlice';
import { toast } from 'react-toastify';

const StoreDashboard = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
 
  const dispatch  = useDispatch();

  const {getreview} = useSelector((state)=> state.user2);
  const {getallreviews} = useSelector((state)=> state.user2);
  const {getallusers} = useSelector((state)=> state.user);


//   console.log(getallreviews);



  const {getstore} = useSelector((state)=> state.user2);
  console.log(getstore);

  let storereview = getreview?.[0]?.data.filter((element)=>{
     if(element.storeId == getstore?.[0]?.[0]?.id){
           
        return element;
     }
  });

    const getstoreReviews = getallreviews?.[0]?.filter((element)=>{
        if(element.store_id === getstore?.[0]?.[0]?.id ){
            return element
        }
    })

    console.log(getallusers);


let users = getstoreReviews?.map((review) => {
  return getallusers?.[0]?.find((user) => user.id === review.user_id);
}).filter(Boolean); // removes undefined if no match

    getallusers?.[0]?.map((element)=>{
        console.log(element);
        
    })


    console.log(users);
    
    

  console.log(getstoreReviews);
  
  



const {userverify} = useSelector((state)=>state.user2);
console.log(userverify);
let email  = userverify?.[0]?.[0]?.email;
// console.log(userverify?.[0]?.[0]?.email);

   
    let data = {
        email
    }

 useEffect(() => {
    dispatch(userVerify());
    dispatch(getReview());
    dispatch(getAllReviews())
    dispatch(getallUsers())
  }, [dispatch]);

  // Once verified and email is available, get store info
  useEffect(() => {
    if (userverify && email) {
        console.log(email);
        
      dispatch(getStore(data));
    }
  }, [userverify, email, dispatch]);

    
    
  // Password change form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
  
 
    
let storeData = [];

 storeData = users?.map((element)=>{
      return {
        id: element?.id, 
        userName: element?.username, 
        email: element?.email, 
        rating: 5, 
        comment: "Excellent service and fast delivery!", 
        date: "2024-05-15"
      }
   })
  
  
  // Calculate average rating
//   const averageRating = storeData.ratings.reduce((sum, rating) => sum + rating.rating, 0) / storeData.ratings.length;
  
  // Handle password change
  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.info("Both Passwords Should be match")
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.info('New password must be at least 6 characters');
      return;
    }
    
    console.log(passwordData);

    let data = {
        userId:userverify?.[0]?.[0]?.id,
        oldPassword:passwordData.currentPassword,
        newPassword:passwordData.confirmPassword
    }

    dispatch(ChangePassword(data))
    
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordForm(false);
   
  };
  
 
  const handleLogout = () => {
    localStorage.removeItem("Token");
    setTimeout(() => 
     navigate("/")
    , 1000);
     
  };
  
  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };
  
  // Calculate rating distribution
//   const ratingDistribution = {
//     5: storeData.ratings.filter(r => r.rating === 5).length,
//     4: storeData.ratings.filter(r => r.rating === 4).length,
//     3: storeData.ratings.filter(r => r.rating === 3).length,
//     2: storeData.ratings.filter(r => r.rating === 2).length,
//     1: storeData.ratings.filter(r => r.rating === 1).length,
//   };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-indigo-100 rounded-lg p-2 mr-3">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{getstore?.[0]?.[0]?.storename}</h1>
                <p className="text-sm text-gray-500">Store ID: {getstore?.[0]?.[0]?.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {userverify?.[0]?.[0]?.username}</span>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition duration-200"
              >
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 hover:cursor-pointer text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-200"
              >
                <LogOut className="w-4 h-4 mr-2 "  />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        
        {/* Password Change Form */}
        {showPasswordForm && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handlePasswordChange}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Average Rating Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Average Rating</h3>
                <div className="flex items-center mt-2">
                  <span className="text-3xl font-bold text-indigo-600">{storereview?.[0]?.avgRating}</span>
                  <div className="flex ml-3">
                    {renderStars(Math.round(storereview?.[0]?.avgRating))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Based on {storereview?.[0]?.totalReviews} reviews</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
          
          {/* Total Reviews Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Total Reviews</h3>
                <span className="text-3xl font-bold text-green-600">{storereview?.[0]?.totalReviews}</span>
                <p className="text-sm text-gray-600 mt-1">Customer feedback received</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <User className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          
        
        </div>
        
        
        
        {/* User Ratings List */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
            <p className="text-gray-600 mt-1">View all users who have submitted ratings for your store</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {storeData?.map((rating,index) => (
              <div key={rating.id} className="p-6 hover:bg-gray-50 transition duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="bg-indigo-100 rounded-full p-2 mr-3">
                        <User className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{rating.userName}</h4>
                        <p className="text-sm text-gray-600">{rating.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-2 ml-11">
                      <div className="flex mr-3">
                        {renderStars(getstoreReviews?.[index]?.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{getstoreReviews?.[index]?.user_id === rating?.id ? getstoreReviews?.[index]?.rating : "0"}/5</span>
                    </div>
                    
                    <p className="text-gray-700 mb-2 ml-11">{getstoreReviews?.[index]?.review}</p>
                    <p className="text-sm text-gray-500 ml-11">Reviewed on {new Date(rating.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
import React, { useState } from 'react';
import { Star, MapPin, Clock, Phone, Search, LogOut, User } from 'lucide-react';
import { useEffect } from 'react';
import { getallStores } from '../../Redux/Slice/AdminSlice/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, getReview, userVerify } from '../../Redux/Slice/UserSlice/userSlice';
import { useNavigate } from 'react-router-dom';

const StorePage = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const dispatch = useDispatch();
  const { getallstores } = useSelector((state) => state.user);
  const {userverify} = useSelector((state)=>state.user2);
  const {getreview} = useSelector((state)=>state.user2);
  const {addreview} = useSelector((state)=>state.user2);
  const navigate = useNavigate();

  
  console.log(getreview?.[0]?.data);
  console.log(userverify?.[0]?.[0]?.id);
  
  let id = userverify?.[0]?.[0]?.id
  console.log("id",id);
  
  let stores=[];


  useEffect(()=>{
    dispatch(getallStores());
    dispatch(userVerify())
    dispatch(getReview())
  },[])

  useEffect(()=>{
  dispatch(getReview());
  },[addreview])

  stores = getallstores?.[0]?.map((element) => {
    return {
      id: element?.id,
      name: element?.storename,
      email: element?.email,
      rating: 4.5,
      totalReviews: 1234,
      address: element?.address,
      category: "Electronics",
      phone: "+1 (555) 123-4567",
      hours: "9:00 AM - 9:00 PM"
    }
  })

  // Filter stores based on search query
  const filteredStores = stores?.filter(store => {
    if (!searchQuery.trim()) return true;
    return (
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }) || [];

  // Handle logout
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem("Token");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const renderStars = (rating, interactive = false, size = "w-5 h-5") => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} cursor-pointer transition-all duration-200 ${
              star <= (interactive ? (hoveredRating || userRating) : Math.floor(rating))
                ? 'text-yellow-400 fill-yellow-400'
                : star <= rating
                ? 'text-yellow-400 fill-yellow-400 opacity-50'
                : 'text-gray-300'
            } ${interactive ? 'hover:scale-110' : ''}`}
            onClick={interactive ? () => setUserRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store);
    setUserRating(0);
    setHoveredRating(0);
    setReviewText('');
  };

  const handleSubmitReview = () => {
    if (userRating === 0) {
      alert('Please select a rating!');
      return;
    }

    const reviewData = {
      storeId: selectedStore.id,
      userId : id,
      storeName: selectedStore.name,
      rating: userRating,
      review: reviewText,
      timestamp: new Date().toISOString()
    };

    dispatch(addReview(reviewData));
    
    setSelectedStore(null);
    setUserRating(0);
    setReviewText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title Section */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Discover Amazing Stores
              </h1>
              <p className="text-gray-600 mt-2">Find the perfect store for your needs</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-auto lg:mx-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search stores, categories, or locations..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* User Profile & Logout */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-5 h-5 text-purple-500" />
                <span className="hidden sm:inline font-medium">Welcome back!</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="mt-4 text-sm text-gray-600">
              Found {filteredStores.length} store{filteredStores.length !== 1 ? 's' : ''} 
              {searchQuery && ` matching "${searchQuery}"`}
            </div>
          )}
        </div>
      </div>

      {/* Store Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredStores.length === 0 ? (
          // No results found
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No stores found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all stores
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200"
            >
              Show All Stores
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStores?.map((store,index) => (
              <div
                key={store.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden group"
                onClick={() => handleStoreClick(store)}
              >
                {/* Store Image */}
                <div className="relative h-48 bg-gradient-to-r from-purple-400 to-blue-500 overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-6xl font-bold opacity-30">
                      {store.name.charAt(0)}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-gray-700">{store.category}</span>
                  </div>
                </div>

                {/* Store Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                    {store.name}
                  </h3>
                  
                  {/* Rating */}
                  {
                    getreview?.[0]?.data?.[index]?.storeId == store.id &&
                    <div className="flex items-center gap-2 mb-3">
                    {renderStars(store.rating)}
                    <span className="text-sm font-semibold text-gray-700">{`${getreview?.[0]?.data?.[index]?.avgRating}`}</span>
                    <span className="text-sm text-gray-500">({getreview?.[0]?.data?.[index]?.totalReviews} reviews)</span>
                  </div>
                  }

                  {/* Store Info */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{store.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span>{store.phone}</span>
                    </div>
                  </div>

                  {/* Click to Review Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-2 px-4 rounded-lg font-semibold group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-200">
                      Click to Rate & Review
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {selectedStore && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Rate & Review</h2>
                <h3 className="text-lg font-semibold text-purple-600">{selectedStore.name}</h3>
              </div>

              {/* Rating Section */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Your Rating
                </label>
                <div className="flex justify-center">
                  {renderStars(userRating, true, "w-8 h-8")}
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  {userRating > 0 ? `You rated ${userRating} star${userRating > 1 ? 's' : ''}` : 'Click to rate'}
                </p>
              </div>

              {/* Review Text */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Review (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows="4"
                  placeholder="Share your experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setSelectedStore(null)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-semibold"
                  onClick={handleSubmitReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorePage;
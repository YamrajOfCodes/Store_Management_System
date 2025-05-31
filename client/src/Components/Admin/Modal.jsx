import React, { useState } from 'react';
import { X } from 'lucide-react';
import { addAdmin, addStore, Register } from '../../Redux/Slice/UserSlice/userSlice';
import { useDispatch } from 'react-redux';

export default function UserForm({ onClose, title }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
  });

  const [storeData, setStoreData] = useState({
    storename: '',
    email: '',
    address: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (title === "User" || title === "Admin") {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (title === "Store") {
      setStoreData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form based on title
  const validateForm = () => {
    const newErrors = {};

    if (title === "User" || title === "Admin") {
      if (!formData.username.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }
    } else if (title === "Store") {
      if (!storeData.storename.trim()) {
        newErrors.name = 'Store name is required';
      }
      
      if (!storeData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(storeData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (!storeData.address.trim()) {
        newErrors.address = 'Address is required';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      try {
        if (title === "User") {
          dispatch(Register(formData));
          alert('User registered successfully!');
        } else if (title === "Store") {
          dispatch(addStore(storeData));
          alert('Store added successfully!');
        } else if (title === "Admin") {
          let data ={
            admin_name:formData?.username,
            email:formData?.email,
            password:formData?.password,
            address:formData?.address
          }
          dispatch(addAdmin(data));
          alert('Admin added successfully!');
        }
        onClose();
      } catch (error) {
        alert('An error occurred. Please try again.');
        console.error('Form submission error:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  // Get current form values based on title
  const getCurrentValues = () => {
    if (title === "Store") {
      return {
        name: storeData.storename,
        email: storeData.email,
        address: storeData.address
      };
    }
    return {
      name: formData.username,
      email: formData.email,
      password: formData.password,
      address: formData.address
    };
  };

  const currentValues = getCurrentValues();
  const needsPassword = title === "User" || title === "Admin";

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="min-h-screen w-full md:w-3/4 py-8 px-4">
        <div className="max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}>
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className='w-full flex justify-between items-center mb-8'>
              <h1 className="text-2xl font-bold text-gray-800">
                Add New {title}
              </h1>
              <button className='hover:cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors' onClick={onClose}>
                <X />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  {title === "Store" ? 'Store Name' : 'Full Name'}
                </label>
                <input
                  type="text"
                  id="name"
                  name={title === "Store" ? "storename" : "username"}
                  value={currentValues.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder={title === "Store" ? 'Enter store name' : 'Enter full name'}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={currentValues.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field - Only for User and Admin */}
              {needsPassword && (
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={currentValues.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12 ${
                        errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.password}
                    </p>
                  )}
                </div>
              )}

              {/* Address Field */}
              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={currentValues.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter full address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Add {title}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
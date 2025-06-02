import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, MapPin, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Login, Register } from '../../Redux/Slice/AdminSlice/adminSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userVerify } from '../../Redux/Slice/UserSlice/userSlice';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useSelector((state) => state.user);
    // console.log(login);
    const navigate = useNavigate();



    const [role, setrole] = useState("");

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        address: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            let data = {
                email: formData.email,
                password: formData.password
            }
            dispatch(Login(data)).then((res) => {
                if (res.payload) {
                    const { role } = res.payload.user; 
                    setrole(role);
                    toast.success("Login successful");
                    if (role === 'admin') {
                        navigate('/dashboard');
                    } else if(role === "user") {
                        navigate('/store');
                    } else{
                        navigate("/storedashboard")
                    }
                } else {
                    toast.error("Login failed");
                }
            });

        }  else {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;
        if (!passwordRegex.test(formData.password)) {
            toast.error("Password must be 8-16 characters, include at least one uppercase letter and one special character.");
            return;
        }

        dispatch(Register(formData)).then((res) => {
            if (res.payload) {
                toast.success("Registration successful! Please login.");
                setIsLogin(true);
            } else {
                toast.error("Registration failed.");
            }
        });
    }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({ username: '', email: '', password: '', address: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-white opacity-30" />
                    </div>
                ))}
            </div>

            {/* Main container */}
            <div className="relative z-10 w-full max-w-md">
                <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-105 transition-all duration-300">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl mb-4 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
                        </h1>
                        <p className="text-gray-300">
                            {isLogin ? 'Sign in to your account' : 'Create your new account'}
                        </p>
                    </div>

                    {/* Form toggle buttons */}
                    <div className="flex bg-white/10 rounded-2xl p-1 mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${isLogin
                                ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                                : 'text-white hover:bg-white/10'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${!isLogin
                                ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                                : 'text-white hover:bg-white/10'
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        {/* Username field (only for registration) */}
                        {!isLogin && (
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                                        placeholder="Enter your username"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email field */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Address field (only for registration) */}
                        {!isLogin && (
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Address
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/15 resize-none"
                                        placeholder="Enter your address"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-300">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={toggleForm}
                                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300 hover:underline"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
}
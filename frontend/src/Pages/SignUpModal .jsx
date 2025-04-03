import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpModal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with signup
      console.log('Form data:', formData);
      // Here you would typically call an API to register the user
      // navigate('/dashboard'); // Redirect after successful signup
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className=" w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={() => navigate(-1)}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center">
          Create your <span className="text-blue-500">Free</span> Account
        </h2>

        {/* Google Signup */}
        <button 
          type="button"
          className="flex items-center justify-center w-full mt-6 py-2 border rounded text-sm font-medium hover:bg-black hover:bg-opacity-10"
        >
          <img
            src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t"></div>
          <span className="mx-3 text-xs text-gray-400">OR</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring ${errors.username ? 'border-red-500' : ''}`}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          {/* Full Name Field */}
          <div className="mb-3">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Continue Button */}
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 transition"
          >
            Continue
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/login">
            Login
          </Link>
        </div>
        <div className="text-center mt-2 text-xs text-gray-400">
          Try{" "}
          <a href="/ai" className="text-gray-500 underline hover:text-black">
            invideo AI
          </a>
          , the new idea-to-video generator
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SignUpModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    Username: "",
    Full_Name: "",
    email: "",
    password: "",
    dob: "", // Added DOB field
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Username) newErrors.Username = "Username is required";
    if (!formData.Full_Name) newErrors.Full_Name = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      // Validate if the user is at least 5 years old
      const birthDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (age < 5 || (age === 5 && monthDiff < 0) || (age === 5 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        newErrors.dob = "You must be at least 5 years old";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null); // Reset API error

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Register the user
      const response = await axios.post(
        "http://localhost:5005/api/auth/signup",
        {
          ...formData,
          role: "user" // Default role
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check response and redirect to verification page
      if (response.data && response.data.message) {
        // Successful registration with verification email sent
        navigate("/verify-email", { 
          state: { email: formData.email },
          replace: true 
        });
      }
    } catch (error) {
      console.error("Registration error:", error);

      // Handle different types of errors
      if (error.response) {
        if (error.response.data.errors) {
          // Handle validation errors from server
          setErrors(error.response.data.errors);
        } else {
          setApiError(
            error.response.data.message ||
              "Registration failed. Please try again."
          );
        }
      } else if (error.request) {
        setApiError("Network error. Please check your connection.");
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-md mx-auto rounded-xl shadow-2xl p-8 relative bg-gray-900 border border-gray-800 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 z-0"></div>
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid Lines Background Effect */}
        <div className="absolute inset-0 opacity-10 z-0" 
            style={{
              backgroundImage: "linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }}>
        </div>
        
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 text-xl z-10 transition-colors duration-300"
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
        >
          &times;
        </button>
        {/* Content with z-index to appear above background effects */}
        <div className="relative z-10">
          {/* Title with Gradient */}
          <h2 className="text-3xl font-bold text-center mb-6">
            <span className="text-white">Create your </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              Free
            </span>
            <span className="text-white"> Account</span>
          </h2>

          {/* Google Signup */}
          <button
            type="button"
            className="flex items-center justify-center w-full py-3 border rounded-full text-sm font-medium mb-5 border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700/50 transition-all duration-300"
            disabled={isSubmitting}
          >
            <img
              src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>

          {/* Divider with Futuristic Style */}
          <div className="flex items-center my-5">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            <span className="mx-3 text-xs text-cyan-300">OR</span>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>

          {/* API Error Message */}
          {apiError && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 text-red-400 text-sm rounded-lg">
              {apiError}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  name="Username"
                  placeholder="Username"
                  value={formData.Username}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
                    errors.Username ? "border-red-500" : "border-gray-700"
                  }`}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 pointer-events-none"></div>
              </div>
              {errors.Username && (
                <p className="text-red-400 text-xs mt-1">{errors.Username}</p>
              )}
            </div>

            {/* Full Name Field */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  name="Full_Name"
                  placeholder="Full Name"
                  value={formData.Full_Name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
                    errors.Full_Name ? "border-red-500" : "border-gray-700"
                  }`}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 pointer-events-none"></div>
              </div>
              {errors.Full_Name && (
                <p className="text-red-400 text-xs mt-1">{errors.Full_Name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  }`}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 pointer-events-none"></div>
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  }`}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 pointer-events-none"></div>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Date of Birth Field with Styled Date Picker */}
            <div className="mb-5">
              <div className="relative">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
                    errors.dob ? "border-red-500" : "border-gray-700"
                  }`}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 pointer-events-none"></div>
              </div>
              {errors.dob && (
                <p className="text-red-400 text-xs mt-1">{errors.dob}</p>
              )}
            </div>

            {/* CTA Button with Futuristic Style */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-6 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden group"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              <span className="relative">
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Processing...
                  </div>
                ) : (
                  "Continue"
                )}
              </span>
            </button>
          </form>

          {/* Footer Links with Updated Styling */}
          <div className="text-center mt-6 text-sm text-gray-400">
            Have an account?{" "}
            <Link
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
              to="/login"
              state={{ from: location.state?.from }}
            >
              Login
            </Link>
          </div>

          <div className="text-center mt-2 text-xs text-gray-500">
            Try{" "}
            <a
              href="/ai"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text hover:from-blue-400 hover:to-purple-500 transition-all duration-300"
            >
              invideo AI
            </a>
            <span>, the new idea-to-video generator</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios: npm install axios

const SignUpModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    Username: "",
    Full_Name: "",
    email: "",
    password: "",
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null); // Reset API error
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Replace this URL with your actual API endpoint
      const response = await axios.post(
        "https://b9f9-49-36-83-170.ngrok-free.app/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful registration
      console.log("Registration successful:", response.data);
      
      // Option 1: Redirect to login with success message
      navigate("/login", {
        state: {
          from: location.state?.from || "/",
          registered: true, // To show success message on login page
        },
        replace: true,
      });

      // Option 2: If your API returns a token and you want to login immediately
      // localStorage.setItem("authToken", response.data.token);
      // navigate(location.state?.from || "/dashboard", { replace: true });

    } catch (error) {
      console.error("Registration error:", error);
      
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
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
        // The request was made but no response was received
        setApiError("Network error. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative ">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          <span className="mx-3 text-xs">OR</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* API Error Message */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {apiError}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-3">
            <input
              type="text"
              name="Username"
              placeholder="Username"
              value={formData.Username}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring ${
                errors.Username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.Username && (
              <p className="text-red-500 text-xs mt-1">{errors.Username}</p>
            )}
          </div>

          {/* Full Name Field */}
          <div className="mb-3">
            <input
              type="text"
              name="Full_Name"
              placeholder="Full Name"
              value={formData.Full_Name}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring ${
                errors.Full_Name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.Full_Name && (
              <p className="text-red-500 text-xs mt-1">{errors.Full_Name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Processing...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 text-sm text-gray-800">
          Have an account?{" "}
          <Link
            className="text-blue-500 hover:underline"
            to="/login"
            state={{ from: location.state?.from }}
          >
            Login
          </Link>
        </div>
        <div className="text-center mt-2 text-xs ">
          Try{" "}
          <a href="/ai" className="text-gray-600 underline hover:text-black">
            invideo AI
          </a>  
          , the new idea-to-video generator
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
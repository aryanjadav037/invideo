import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    // If already authenticated, redirect to workspace or intended destination
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/workspace";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to fetch user data with the token
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/user/me", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // 1. Login to get token
      const loginResponse = await axios.post(
        "http://localhost:5005/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

      const token = loginResponse.data.token;

      if (!token) {
        throw new Error("No token received from server");
      }

      // 2. Fetch user data with token
      const userData = await fetchUserData();
      
      // 3. Save both token and user data
      login(token, userData);

      // 4. Redirect to intended location or default to /workspace
      const from = location.state?.from?.pathname || "/workspace";
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        server:
          error.response?.data?.message || "Login failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If already authenticated, render nothing (redirect happens in useEffect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative bg-white">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={() => navigate(-1)}
          disabled={isLoading}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4">
          Login to your account
        </h2>

        {/* Google Login */}
        <button
          type="button"
          className="flex items-center justify-center w-full py-2 border rounded text-sm font-medium hover:bg-gray-100 mb-3"
          disabled={isLoading}
        >
          <img
            src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Login with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t"></div>
          <span className="mx-3 text-xs">OR</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* Server Error */}
        {errors.server && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Continue"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-4 text-sm text-gray-800">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline"
            onClick={(e) => isLoading && e.preventDefault()}
          >
            Sign Up
          </Link>
        </div>

        <div className="text-center mt-2 text-xs">
          Try{" "}
          <a
            href="/ai"
            className="underline hover:text-black"
            onClick={(e) => isLoading && e.preventDefault()}
          >
            invideo AI
          </a>
          , the new idea-to-video generator
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
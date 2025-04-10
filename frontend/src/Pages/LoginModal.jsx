import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AppWindowIcon } from "lucide-react";
const api = import.meta.env.VITE_SERVER_API;

const LoginModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

  const fetchUserData = async () => {
    try {
      var response = await axios.get(`${api}/api/user/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("User data fetched====>", response.data);
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const loginResponse = await axios.post(
        `${api}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );

      const token = loginResponse.data.token;

      if (!token) {
        throw new Error("No token received from server");
      }

      const userData = await fetchUserData();

      login(token, userData);

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

  if (isAuthenticated) {
    return null;
  }

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
          disabled={isLoading}
        >
          &times;
        </button>

        {/* Content with z-index to appear above background effects */}
        <div className="relative z-10">
          {/* Title with Gradient */}
          <h2 className="text-3xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              Login to your account
            </span>
          </h2>

          {/* Google Login */}
          <button
            type="button"
            className="flex items-center justify-center w-full py-3 border rounded-full text-sm font-medium mb-5 border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700/50 transition-all duration-300"
            disabled={isLoading}
          >
            <img
              src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Login with Google
          </button>

          {/* Divider with Futuristic Style */}
          <div className="flex items-center my-5">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            <span className="mx-3 text-xs text-cyan-300">OR</span>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>

          {/* Server Error */}
          {errors.server && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 text-red-400 text-sm rounded-lg">
              {errors.server}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  }`}
                  disabled={isLoading}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 pointer-events-none"></div>
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  }`}
                  disabled={isLoading}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 pointer-events-none"></div>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* CTA Button with Futuristic Style */}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-6 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden group ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              <span className="relative">{isLoading ? "Logging in..." : "Continue"}</span>
            </button>
          </form>

          {/* Footer Links with Updated Styling */}
          <div className="text-center mt-6 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
              onClick={(e) => isLoading && e.preventDefault()}
            >
              Sign Up
            </Link>
          </div>

          <div className="text-center mt-2 text-xs text-gray-500">
            Try{" "}
            <a
              href="/ai"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text hover:from-blue-400 hover:to-purple-500 transition-all duration-300"
              onClick={(e) => isLoading && e.preventDefault()}
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

export default LoginModal;
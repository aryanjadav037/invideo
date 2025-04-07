import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginModal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Replace with your actual login API call
      // const response = await loginUser(formData);
      // console.log('Login successful:', response);
      // navigate('/dashboard'); // Redirect after successful login

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login form data:", formData);
      // navigate('/'); // Redirect to home after login
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const location = useLocation();
      navigate(location.state?.from || "/workspace", { replace: true });

    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ server: "Invalid email or password" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative">
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
          <span className="mx-3 text-xs ">OR</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring ${
                errors.email ? "border-red-500" : ""
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring ${
                errors.password ? "border-red-500" : ""
              }`}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Server Error */}
          {errors.server && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
              {errors.server}
            </div>
          )}

          {/* Continue Button */}
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

import React from "react";
import { Link, useNavigate,  } from "react-router-dom";

const ErrorPage = () => {
const navigate = useNavigate();
  return (
    <div className="bg-[#171717] min-h-screen flex flex-col items-center justify-center text-center px-4 space-y-6">
      {/* Error Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-[#00DF9A]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {/* Error Message */}
      <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>

      <p className="text-gray-400 text-lg">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center px-6 py-3 bg-[#00DF9A] text-black font-semibold rounded-lg hover:bg-[#00DF9A]/90 transition-colors"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;

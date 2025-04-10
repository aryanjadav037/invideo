import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UnderConstructionPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 relative overflow-hidden">
      {/* Glowing Background Effects - similar to HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 z-0"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      {/* Grid Lines Background Effect */}
      <div className="absolute inset-0 opacity-10 z-0" 
           style={{
             backgroundImage: "linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)",
             backgroundSize: "30px 30px"
           }}>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        {/* Construction Icon with Animated Glow */}
        <div className="relative mx-auto w-32 h-32 mb-2">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-70 animate-pulse"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-32 w-32 text-white relative"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        </div>

        {/* Main Message with Gradient Text */}
        <h1 className="text-5xl font-bold">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            Under Construction
          </span>
        </h1>
        
        {/* Subtitle with Futuristic Style */}
        <p className="text-gray-400 text-xl mx-auto mb-6">
          We're building something amazing for you. Our team is working hard to bring you the ultimate AI video generation experience.
        </p>
        
        {/* Animated Progress Bar */}
        <div className="w-full max-w-md mx-auto h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-2/3 relative">
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>
        
        <p className="text-cyan-300 text-lg">Coming Soon</p>
        
        {/* Back Button with Futuristic Style */}
        <div className="pt-4">
          <button
            onClick={() => navigate(-1)} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-8 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 relative overflow-hidden group inline-block"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            <span className="relative">Go Back</span>
          </button>
        </div>
        
        {/* Contact Info */}
        <p className="text-gray-500 text-sm pt-6">
          Questions? Contact us at <span className="text-blue-400">support@aivideos.com</span>
        </p>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
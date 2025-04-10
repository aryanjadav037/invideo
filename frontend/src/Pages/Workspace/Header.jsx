import React from 'react';
import { FaImage } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';

const Header = ({ user, showProfile, setShowProfile }) => {
  return (
    <header className="flex items-center justify-between p-3 sm:p-4 border-b border-indigo-900/30 bg-gradient-to-r from-gray-900 via-indigo-950/30 to-purple-900/20 backdrop-blur-md sticky top-0 z-20 transition-all duration-300">
      {/* Logo/Title Section */}
      <div className="flex items-center">
        <div className="mr-2 sm:mr-3 p-2 sm:p-2.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 transform transition-transform hover:scale-105 group">
          <FaImage className="text-lg sm:text-xl text-white group-hover:text-indigo-100 transition-colors" />
        </div>
        <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
          AI Workspace
        </span>
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Upgrade Button - Hidden on mobile, shown on sm screens and up */}
        <button className="hidden sm:flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-indigo-500/50 transform hover:-translate-y-0.5">
          <Sparkles className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
          <span className="hidden sm:inline">Upgrade Pro</span>
          <span className="sm:hidden">Pro</span>
        </button>

        {/* Mobile-friendly upgrade button */}
        <button className="sm:hidden flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-lg shadow-md">
          <Sparkles className="h-4 w-4" />
        </button>

        {/* Profile Button */}
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center hover:from-purple-400 hover:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-purple-500/50 transform hover:scale-105 ring-2 ring-purple-400/20"
          aria-label="User profile"
        >
          <span className="text-sm sm:text-base font-medium">
            {user?.data?.Username?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
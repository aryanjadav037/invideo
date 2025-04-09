import React from 'react';
import { FaImage } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';

const Header = ({ user, showProfile, setShowProfile }) => {
  return (
    <header className="flex items-center justify-between p-3 border-b border-indigo-900/30 bg-gradient-to-r from-gray-900 via-indigo-950/30 to-purple-900/20 backdrop-blur-md sticky top-0 z-20 transition-all duration-300">
      <div className="flex items-center">
        <div className="mr-3 p-2.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 transform transition-transform hover:scale-105 group">
          <FaImage className="text-xl text-white group-hover:text-indigo-100 transition-colors" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
          AI Workspace
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-indigo-500/50 transform hover:-translate-y-0.5">
          <Sparkles className="mr-2 h-4 w-4" /> Upgrade Pro
        </button>
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center hover:from-purple-400 hover:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-purple-500/50 transform hover:scale-105 ring-2 ring-purple-400/20"
          aria-label="User profile"
        >
          {user?.data?.Username?.charAt(0)?.toUpperCase() || 'U'}
        </button>
      </div>
    </header>
  );
};

export default Header;
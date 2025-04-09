import React from 'react';
import { FaImage, FaCrown } from 'react-icons/fa';

const Header = ({ user, showProfile, setShowProfile }) => {
  return (
    <header className="flex items-center justify-between p-2 border-b border-indigo-900/30 bg-gradient-to-r from-gray-900 to-indigo-900/40 backdrop-blur-md sticky top-0 z-20 transition-all duration-300">
      <div className="flex items-center">
        <div className="mr-3 p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20 transform transition-transform hover:scale-105">
          <FaImage className="text-xl text-white" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          AI Workspace
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-indigo-500/50 transform hover:-translate-y-0.5">
          <FaCrown className="mr-2" /> Upgrade
        </button>
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-purple-500/50 transform hover:scale-105"
          aria-label="User profile"
        >
          {user?.data?.Username?.charAt(0)?.toUpperCase() || 'U'}
        </button>
      </div>
    </header>
  );
};

export default Header;
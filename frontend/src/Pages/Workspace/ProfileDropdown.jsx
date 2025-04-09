import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pencil, LogOut, User, Settings, CreditCard } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const ProfileDropdown = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Perform logout using the context function
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails on the server, proceed with client-side logout
      navigate('/login');
    }
  };

  // Get first letter of username for avatar
  const userInitial = user?.data?.Username?.charAt(0)?.toUpperCase() || 'U';
  
  return (
    <div className="absolute right-4 top-16 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl p-5 w-72 z-50 border border-indigo-900/30 backdrop-blur-md animate-fadeIn transform origin-top-right transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-purple-500/30">
            {userInitial}
          </div>
          <div>
            <h3 className="font-bold text-white">{user?.data?.Username || 'User'}</h3>
            <p className="text-sm text-blue-400">{user?.data?.email || 'user@example.com'}</p>
          </div>
        </div>
        <Link to="/profile" className="text-gray-400 hover:text-white p-2 hover:bg-indigo-900/30 rounded-full transition-all duration-300">
          <Pencil className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-2 mb-5">
        <Link to="/profile" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-indigo-900/30 transition-all duration-300 group">
          <User className="w-5 h-5 mr-3 text-indigo-400 group-hover:text-blue-400 transition-colors" />
          <span>My Profile</span>
        </Link>
        <Link to="/settings" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-indigo-900/30 transition-all duration-300 group">
          <Settings className="w-5 h-5 mr-3 text-indigo-400 group-hover:text-blue-400 transition-colors" />
          <span>Settings</span>
        </Link>
        <Link to="/billing" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-indigo-900/30 transition-all duration-300 group">
          <CreditCard className="w-5 h-5 mr-3 text-indigo-400 group-hover:text-blue-400 transition-colors" />
          <span>Subscription</span>
        </Link>
      </div>

      <div className="border-t border-gray-700/50 pt-4">
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-red-500/30 flex items-center justify-center transform hover:-translate-y-0.5"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
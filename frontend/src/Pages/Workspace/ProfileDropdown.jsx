import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pencil, LogOut, User, Settings, CreditCard, Shield } from 'lucide-react';
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
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-t-lg"></div>
      <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl blur-xl opacity-20 -z-10"></div>
      
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-purple-500/30 ring-2 ring-white/10">
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

      <div className="space-y-1 mb-5">
        <Link to="/profile" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-indigo-900/40 transition-all duration-300 group">
          <div className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center mr-3 group-hover:bg-indigo-800/40 transition-colors">
            <User className="w-4 h-4 text-indigo-400 group-hover:text-blue-400 transition-colors" />
          </div>
          <span>My Profile</span>
        </Link>
        <Link to="/settings" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-indigo-900/40 transition-all duration-300 group">
          <div className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center mr-3 group-hover:bg-indigo-800/40 transition-colors">
            <Settings className="w-4 h-4 text-indigo-400 group-hover:text-blue-400 transition-colors" />
          </div>
          <span>Settings</span>
        </Link>
        <Link to="/billing" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-indigo-900/40 transition-all duration-300 group">
          <div className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center mr-3 group-hover:bg-indigo-800/40 transition-colors">
            <CreditCard className="w-4 h-4 text-indigo-400 group-hover:text-blue-400 transition-colors" />
          </div>
          <span>Subscription</span>
        </Link>
        <Link to="/security" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-indigo-900/40 transition-all duration-300 group">
          <div className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center mr-3 group-hover:bg-indigo-800/40 transition-colors">
            <Shield className="w-4 h-4 text-indigo-400 group-hover:text-blue-400 transition-colors" />
          </div>
          <span>Security</span>
        </Link>
      </div>

      <div className="pt-4 border-t border-gray-700/50">
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-red-500/30 flex items-center justify-center transform hover:-translate-y-0.5 font-medium"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
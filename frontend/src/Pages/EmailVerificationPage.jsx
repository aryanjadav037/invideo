import React from 'react';
import { Link } from 'react-router-dom';

const EmailVerificationPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
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
      
      {/* Main Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Card with glowing border */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-md opacity-70 transform scale-[1.02]"></div>
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-800 p-8 relative">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">Check your email</h2>
              
              <p className="text-cyan-300 text-lg mb-6">
                We've sent a verification link to your email address.
              </p>
              
              <p className="text-gray-400 mb-6">
                Please check your <span className="text-white font-medium">inbox or spam folder</span> and click the link to verify your account.
              </p>
              
              <div className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg mb-6 border border-blue-500/30">
                <p className="text-blue-100 text-sm">
                  Once verified, you'll be able to access your workspace and all features.
                </p>
              </div>
              
              <div className="space-y-4">
                <Link 
                  to="/login" 
                  className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 relative overflow-hidden group"
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  <span className="relative">Go to Login</span>
                </Link>
                
                <Link 
                  to="/" 
                  className="block text-blue-400 hover:text-blue-300 text-sm border border-blue-400 py-2 px-4 rounded-full hover:bg-blue-900/30 transition-colors"
                >
                  Return to Home
                </Link>
                
                <p className="text-gray-500 text-xs mt-4">No additional verification steps required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
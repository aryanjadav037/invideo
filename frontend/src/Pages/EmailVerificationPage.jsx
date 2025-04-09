import React from 'react';
import { Link } from 'react-router-dom';

const EmailVerificationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a verification link to your email address. Please check your <strong>inbox or spam </strong>folder and click the link to verify your account.
          </p>
          
          <div className="p-4 bg-blue-50 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              Once verified, you'll be able to access your workspace and all features.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link to="/login" className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition">
              Go to Login
            </Link>
            <Link to="/" className="block text-blue-500 hover:underline text-sm">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
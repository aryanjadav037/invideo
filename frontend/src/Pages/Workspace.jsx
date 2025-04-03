// src/Pages/Workspace.jsx
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext.jsx';

const Workspace = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Your Workspace</h1>
      <p className="mb-6">Welcome to your protected workspace area!</p>
      <button 
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Workspace;
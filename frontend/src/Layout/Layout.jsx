import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 z-0"></div>
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-5" 
           style={{
             backgroundImage: "linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)",
             backgroundSize: "40px 40px"
           }}>
      </div>
      
      <Navbar />
      <main className="min-h-[calc(100vh-100px)] px-4 py-6 pt-20 relative z-10"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
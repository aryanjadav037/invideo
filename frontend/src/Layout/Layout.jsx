import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Layout = () => {
  return (
    <div className="">
      <Navbar/>
      <main className="min-h-[calc(100vh-100px)] px-4 py-6 "> 
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

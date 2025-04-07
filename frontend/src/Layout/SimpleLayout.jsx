// src/Layout/SimpleLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const SimpleLayout = () => {
  return (
    <div className="">
      <main className="min-h-screen"> 
        <Outlet /> 
      </main>
    </div>
  );
};

export default SimpleLayout;
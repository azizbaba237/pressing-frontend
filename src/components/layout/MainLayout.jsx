import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />

      <div className="flex w-full overflow-x-hidden">
        <Sidebar />

        <main className="flex-1 min-w-0 px-3 sm:px-4 md:px-6 lg:px-8 py-6">
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

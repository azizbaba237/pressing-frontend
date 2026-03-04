import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar fixe en haut — passe le toggle du menu */}
      <Navbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

      {/* Décalage sous la navbar fixe (h-16) */}
      <div className="flex pt-16 min-h-screen">
        {/* Sidebar : reçoit l'état ouvert/fermé */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Contenu principal */}
        <main className="flex-1 min-w-0 overflow-x-hidden px-3 sm:px-5 lg:px-8 py-5 sm:py-6">
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

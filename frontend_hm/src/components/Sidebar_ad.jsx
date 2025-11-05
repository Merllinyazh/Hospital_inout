import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home , Users , Stethoscope,BriefcaseMedicalIcon } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", name: "Dashboard", icon: <Home size={18} /> },
    { path: "/staff", name: "Staff Management", icon: <Users size={18} /> },
    { path: "/doctor", name: "Doctor Management", icon: <Stethoscope size={18} /> },
    { path: "/pharma", name: "Pharmacy", icon:<BriefcaseMedicalIcon size={18} />},
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-red-700 text-white flex flex-col shadow-lg z-50">
      <div className="text-center text-2xl font-bold py-6 border-b border-red-500">
       Hospital Admin
      </div>

      <nav className="flex-1 mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition ${
              location.pathname === item.path
                ? "bg-white text-red-700 shadow-inner"
                : "hover:bg-red-600"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <footer className="text-xs text-center text-red-200 py-4 border-t border-red-600">
        © 2025 Admin Panel
      </footer>
    </div>
  );
}

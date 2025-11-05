import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-64 right-0 z-50 flex justify-between items-center bg-red-100 px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold text-red-700">ADMIN MANAGEMENT</h1>

      <div className="flex gap-4">
        {/* Conditionally show button based on page */}
        {location.pathname.includes("/staff") && (
          <Link
            to="/staff/add"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            + Add Staff
          </Link>
        )}

        {location.pathname.includes("/doctor") && (
          <Link
            to="/doctor/add"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            + Add Doctor
          </Link>
        )}
      </div>
    </div>
  );
}

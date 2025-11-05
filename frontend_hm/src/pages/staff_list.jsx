import React, { useEffect, useState } from "react";
import { getStaff, deleteStaff } from "../api";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Nav";
import { toast } from "react-toastify";

export default function StaffList() {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const { data } = await getStaff();
      setStaffList(data);
      toast.success("✅ Staff data loaded successfully!", { autoClose: 1500 });
    } catch (err) {
      toast.error("❌ Failed to load staff data");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        await deleteStaff(id);
        toast.success("🗑️ Staff deleted successfully!");
        fetchStaff();
      } catch (err) {
        toast.error("❌ Error deleting staff. Try again!");
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen p-8 mb-2 ml-64">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-red-700">Staff Management</h2>
          
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-6 overflow-x-auto">
          <table className="w-full text-left border border-gray-200 rounded-lg">
            <thead className="bg-red-100 text-center text-red-700">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Shift</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff._id} className="hover:bg-gray-50 ">
                  <td className="p-3 text-center border">{staff.name}</td>
                  <td className="p-3 text-center border">{staff.role}</td>
                  <td className="p-3 text-center border">{staff.department}</td>
                  <td className="p-3 text-center border">{staff.shift}</td>
                  <td className="p-3 text-center border">{staff.status}</td>
                  <td className="p-3 border text-center">
                    <Link
                      to={`/staff/edit/${staff._id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(staff._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {staffList.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No staff records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

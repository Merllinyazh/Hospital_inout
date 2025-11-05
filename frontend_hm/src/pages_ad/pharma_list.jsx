import React, { useEffect, useState } from "react";
import { getMedicines, deleteMedicine } from "../api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PharmList() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const { data } = await getMedicines();
      setMedicines(data);
    } catch (err) {
      toast.error("Failed to load medicines");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this medicine?")) return;
    try {
      await deleteMedicine(id);
      toast.success("Medicine deleted successfully");
      fetchMedicines();
    } catch (err) {
      toast.error("Failed to delete medicine");
    }
  };

  return (
    <div className="ml-64 mt-15 px-10 py-10 bg-gray-100 min-h-screen">
      <ToastContainer />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-700">
          Pharmacy Stock Management
        </h1>
        <Link
          to="/pharma/add"
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          + Add Medicine
        </Link>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="w-full text-center border border-gray-200 rounded-lg">
          <thead className="bg-red-100 border text-red-700">
            <tr>
              <th className="px-6 py-3 border text-center">Med ID</th>
              <th className="px-6 py-3 border text-center">Medicine Name</th>
              <th className="px-6 py-3 border text-center">Company</th>
              <th className="px-6 py-3 border text-center">Quantity</th>
              <th className="px-6 py-3 border text-center">Amount</th>
              <th className="px-6 py-3 border text-center">Expiry Date</th>
              
              <th className="px-6 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 border">{med.Med_id}</td>
                <td className="px-6 py-3 border">{med.Med_name}</td>
                <td className="px-6 py-3 border">{med.Company}</td>
                <td className="px-6 py-3 border">{med.Quantity}</td>
                <td className="px-6 py-3 border">{med.Amount}</td>
                <td className="px-6 py-3 border">
                  {new Date(med.Expiry_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-3 border text-center">
                  <Link
                    to={`/pharma/edit/${med._id}`}
                    state={{ medicine: med }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(med._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {medicines.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No medicines found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

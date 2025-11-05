import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDoctors, deleteDoctor } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await getDoctors();
      setDoctors(data);
    } catch (err) {
      toast.error("Failed to load doctors");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await deleteDoctor(id);
      toast.success("Doctor deleted successfully");
      fetchDoctors();
    } catch (err) {
      toast.error("Failed to delete doctor");
    }
  };

  return (
    <div className="ml-64 mt-15 px-10 py-10 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-700">Doctor Management</h1>
        
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="w-full text-center border border-gray-200 rounded-lg">
          <thead className="bg-red-100 text-center border text-red-700">
            <tr>
              <th className="px-6 py-3 border text-center">ID</th>
              <th className="px-6 py-3 border  text-center">Name</th>
              <th className="px-6 py-3 border text-center">Specialization</th>
              <th className="px-6 py-3 border text-center">Employeement Type</th>
              <th className="px-6 py-3 border text-center">Contact</th>
              <th className="px-6 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 border ">{doctor.doctorId}</td>
                <td className="px-6 py-3 border">{doctor.name}</td>
                <td className="px-6 py-3  border">{doctor.specialization}</td>
                <td className="px-6 py-3 border">{doctor.employmentType}</td>
                <td className="px-6 py-3 border">{doctor.contactNo}</td>
                <td className="px-6 py-3 border text-center">
                  <Link
                    to={`/doctor/edit/${doctor._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(doctor._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

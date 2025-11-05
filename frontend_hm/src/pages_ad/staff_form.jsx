import React, { useState, useEffect } from "react";
import { createStaff, getStaffById, updateStaff } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components_ad/Sidebar";
import { toast } from "react-toastify";

export default function StaffForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    staffId: "",
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    salary: "",
    shift: "Morning",
    status: "Active",
  });

  useEffect(() => {
    if (id) loadStaff();
  }, [id]);

  const loadStaff = async () => {
    try {
      const { data } = await getStaffById(id);
      setFormData(data);
    } catch (error) {
      toast.error("⚠️ Failed to load staff details!");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateStaff(id, formData);
        toast.success("✅ Staff updated successfully!");
      } else {
        await createStaff(formData);
        toast.success("✅ Staff added successfully!");
      }

      setTimeout(() => navigate("/staff"), 2000);
    } catch (error) {
      console.error("❌ Error while saving staff:", error);
      const backendMsg = error.response?.data?.error || error.message;
      toast.error(`⚠️ Failed to save staff: ${backendMsg}`);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-3 bg-gray-30 min-height: 70vh p-17 ml-60">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-red-700 mb-2">
            {id ? "Edit Staff" : "Add New Staff"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Staff ID */}
            <input
              type="text"
              name="staffId"
              placeholder="Staff ID"
              value={formData.staffId || ""}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
              required
            />

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
              required
            />

            {/* Role */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
              required
            >
              <option value="">Select Role</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Nursing">Nursing</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Technician">Technician</option>
              <option value="Biomedical">Biomedical</option>
            </select>

            {/* Department */}
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
              required
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Gynecology">Gynecology</option>
            </select>

            {/* Contact Info */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex gap-4">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            </div>

            {/* Shift & Status */}
            <div className="flex gap-4">
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
              >
                <option>Morning</option>
                <option>Evening</option>
                <option>Night</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white w-full py-3 rounded hover:bg-red-700 transition"
            >
              {id ? "Update Staff" : "Add Staff"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

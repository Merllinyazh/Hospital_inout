import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DoctorForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // <-- Used for edit mode
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    employmentType: "",
    contactNo: "",
  });
  const [error, setError] = useState("");

  // Fetch doctor details when editing
  useEffect(() => {
    if (id) {
      fetchDoctorDetails();
    }
  }, [id]);

  const fetchDoctorDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/doctor/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch doctor data");

      // Prefill the form
      setFormData({
        name: data.name || "",
        specialization: data.specialization || "",
        employmentType: data.employmentType || "",
        contactNo: data.contactNo || "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = id
        ? `http://localhost:5000/api/doctor/${id}`
        : `http://localhost:5000/api/doctor/add`;
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save doctor");

      navigate("/doctor");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-96"
      >
        <h2 className="text-lg font-semibold mb-4 text-center text-red-700">
          {id ? "Edit Doctor" : "Add Doctor"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Select Specialization</option>
          <option>Cardiology</option>
          <option>Neurology</option>
          <option>Orthopedics</option>
          <option>Pediatrics</option>
          <option>General Medicine</option>
        </select>

        <select
          name="employmentType"
          value={formData.employmentType}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Select Employment Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Visiting</option>
        </select>

        <input
          type="text"
          name="contactNo"
          placeholder="Contact Number"
          value={formData.contactNo}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          {id ? "Update Doctor" : "Add Doctor"}
        </button>
      </form>
    </div>
  );
}

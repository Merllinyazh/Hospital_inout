import React, { useState, useEffect } from "react";
import { addMedicine, updateMedicine } from "../api";
import { useNavigate, useLocation } from "react-router-dom";

export default function PharmaForm() {
  const [formData, setFormData] = useState({
    Med_id: "",
    Med_name: "",
    Company: "",
    Quantity: "",
    Expiry_date: "",
    Amount:"",
  });

  const [showOtherCompany, setShowOtherCompany] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const editingMed = location.state?.medicine || null;

  // Company dropdown options
  const companies = [
    "MedPharms",
    "Laikin",
    "Midurin",
    "Kilian",
    "PharmsDies",
    "Other",
  ];

  useEffect(() => {
    if (editingMed) {
      setFormData(editingMed);
      setShowOtherCompany(!companies.includes(editingMed.Company));
    }
  }, [editingMed]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Show "Other" input if selected
    if (name === "Company") {
      setShowOtherCompany(value === "Other");
      if (value !== "Other") {
        setFormData((prev) => ({ ...prev, Company: value }));
      }
    }
  };

  const handleOtherCompanyChange = (e) => {
    setFormData((prev) => ({ ...prev, Company: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMed) {
        await updateMedicine(editingMed._id, formData);
      } else {
        await addMedicine(formData);
      }
      navigate("/pharma");
    } catch (error) {
      console.error(error);
      alert("Error saving medicine details");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-50">
      <div className="bg-white shadow-lg ml-25 mt-9 rounded-2xl p-8 w-[500px]">
        <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
          {editingMed ? "Update Medicine" : "Add New Medicine"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Medicine ID */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Medicine ID
            </label>
            <input
              type="text"
              name="Med_id"
              value={formData.Med_id}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {/* Medicine Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Medicine Name
            </label>
            <input
              type="text"
              name="Med_name"
              value={formData.Med_name}
              onChange={handleChange}
              placeholder="Enter Medicine Name"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {/* Company Dropdown */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Company
            </label>
            <select
              name="Company"
              value={showOtherCompany ? "Other" : formData.Company}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            >
              <option value="">Select Company</option>
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* If "Other" selected, show text box */}
            {showOtherCompany && (
              <input
                type="text"
                placeholder="Enter Company Name"
                value={formData.Company}
                onChange={handleOtherCompanyChange}
                className="mt-2 w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="Quantity"
              value={formData.Quantity}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              min="1"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              name="Expiry_date"
              value={formData.Expiry_date?.substring(0, 10) || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div>
          <label>Amount:</label>
          <input
            type="number"
            name="Amount"
            value={formData.Amount}
            onChange={handleChange}
            placeholder="Enter medicine amount for each"
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            required
           />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            {editingMed ? "Update Medicine" : "Add Medicine"}
          </button>
        </form>
      </div>
    </div>
  );
}

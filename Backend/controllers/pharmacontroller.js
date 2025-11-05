import Pharmacy from "../models/Pharmacy.js";

// Get all medicines
export const getMedicines = async (req, res) => {
  try {
    const meds = await Pharmacy.find();
    res.json(meds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new medicine
export const addMedicine = async (req, res) => {
  try {
    const newMed = new Pharmacy(req.body);
    await newMed.save();
    res.status(201).json(newMed);
  } catch (error) {
    console.error("❌ Error saving medicine:", error.message);
    res.status(400).json({ message: error.message });
  }
};
// Update medicine
export const updateMedicine = async (req, res) => {
  try {
    const updatedMed = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedMed);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete medicine
export const deleteMedicine = async (req, res) => {
  try {
    await Pharmacy.findByIdAndDelete(req.params.id);
    res.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

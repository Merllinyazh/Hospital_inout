import Staff from "../models/staff_managements.js";
import { v4 as uuidv4 } from "uuid";

// ✅ Create new staff
export const createStaff = async (req, res) => {
  try {
    const count = await Staff.countDocuments();
    const staffId = `STF${(count + 1).toString().padStart(3, "0")}`;
    
    const staff = await Staff.create({ ...req.body, staffId });
    res.status(201).json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get all staff
export const getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get single staff by ID
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update staff
export const updateStaff = async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStaff)
      return res.status(404).json({ message: "Staff not found" });
    res
      .status(200)
      .json({ message: "Staff updated successfully", updatedStaff });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete staff
export const deleteStaff = async (req, res) => {
  try {
    const deleted = await Staff.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Staff not found" });
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

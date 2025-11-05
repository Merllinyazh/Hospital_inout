import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const staffSchema = new mongoose.Schema({
  staffId: {
    type: String,
    default: () => `STAFF-${uuidv4().slice(0, 8).toUpperCase()}`,
    unique: true,
  },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["Doctor", "Nurse", "Receptionist", "Technician", "Admin"],
    required: true,
  },
  department: { type: String },
  phone: { type: String },
  email: { type: String, unique: true },
  salary: { type: Number },
  shift: {
    type: String,
    enum: ["Morning", "Evening", "Night"],
    default: "Morning",
  },
  dateOfJoining: { type: Date, default: Date.now },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

export default mongoose.model("staff_managements", staffSchema);

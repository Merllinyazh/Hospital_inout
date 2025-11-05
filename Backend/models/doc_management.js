import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  doctorId: { type: String, unique: true },
  name: { type: String, required: true },
  specialization: { type: String },
  employmentType: { type: String },
  contactNo: { type: String, unique: true },
});

export default mongoose.model("doc_management", doctorSchema);

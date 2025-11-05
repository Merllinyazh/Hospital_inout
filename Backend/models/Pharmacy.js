import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema({
  Med_id: {
    type: String,
    required: true,
    unique: true,
  },
  Med_name: {
    type: String,
    required: true,
  },
  Company: {
    type: String,
    required: true, // allow any company name (including custom)
  },
  Quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  Expiry_date: {
    type: Date,
    required: true,
  },

  Amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
export default Pharmacy;

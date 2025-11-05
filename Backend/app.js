import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import staffRoutes from "./routes/staffroute.js";
import doctorRoutes from "./routes/docroute.js";
import pharmaRoutes from "./routes/pharmaroute.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

  app.use("/api/staff", staffRoutes);
  app.use("/api/doctor",doctorRoutes);
  app.use("/api/pharma", pharmaRoutes);

  

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});

import express from "express";
import {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
} from "../controllers/pharmacontroller.js";

const router = express.Router();

router.get("/", getMedicines);
router.post("/", addMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

export default router;

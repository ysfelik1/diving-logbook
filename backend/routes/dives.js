import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  createNewDive,
  deleteDive,
  getAllDives,
  getOneDive,
  updateDive,
  getUsersDives,
} from "../controllers/dives.js";

const router = express.Router();

router.get("/", checkAuth, getAllDives);
router.get("/diver", checkAuth, getUsersDives);
router.get("/:id", checkAuth, getOneDive);
router.post("/", checkAuth, createNewDive);
router.patch("/:id", checkAuth, updateDive);
router.delete("/:id", checkAuth, deleteDive);

export default router;

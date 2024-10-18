import express from "express";
import Dive from "../models/dive.js";
import mongoose from "mongoose";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

// GET /dives
router.get("/", checkAuth, async (req, res) => {
  try {
    const dives = await Dive.find(); // Retrieve all dives from the database
    res.status(200).json({
      message: "List of dives",
      dives, // Send the list of users in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve dives" });
  }
});

// GET /dives/:id
router.get("/:id", checkAuth, async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const dive = await Dive.findById(id); // Retrieve the dive from the database
    if (!dive) {
      return res.status(404).json({ message: "Dive not found" });
    }
    res.status(200).json({ message: "Dive found", dive });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving dive" });
  }
});

// POST /dives
router.post("/", checkAuth, async (req, res) => {
  const dive = new Dive({
    _id: new mongoose.Types.ObjectId(), // Automatically generate ObjectId for new dives
    diver: req.body.diver,
    location: req.body.location,
    date: req.body.date,
    diveSite: req.body.diveSite,
    timeIn: req.body.timeIn,
    timeOut: req.body.timeOut,
    maxDepth: req.body.maxDepth,
    avgDepth: req.body.avgDepth,
    visibility: req.body.visibility,
    current: req.body.current,
    notes: req.body.notes,
  });

  try {
    const result = await dive.save(); // Save the dive to the database
    console.log(result);
    res.status(201).json({
      message: "New dive saved",
      createdDive: result,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      message: "Failed to save new dive",
      error: error.message, // Include error message for more context
    });
  }
});

// PATCH /dives/:id
router.patch("/:id", checkAuth, async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDive = await Dive.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate fields against the schema
    });

    if (!updatedDive) {
      return res.status(404).json({ message: "Dive not found" });
    }

    res.status(200).json({
      message: "Dive updated",
      updatedDive,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update dive" });
  }
});

// DELETE /dives/:id
router.delete("/:id", checkAuth, async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDive = await Dive.findByIdAndDelete(id);

    if (!deletedDive) {
      return res.status(404).json({ message: "Dive not found" });
    }

    res.status(200).json({
      message: "Dive deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete dive" });
  }
});

export default router;

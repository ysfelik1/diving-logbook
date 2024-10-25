import Dive from "../models/dive.js";
import mongoose from "mongoose";

export const getAllDives = async (req, res) => {
  try {
    const dives = await Dive.find(); // Retrieve all dives from the database
    res.status(200).json({
      message: "List of dives",
      dives,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve dives" });
  }
};

export const getUsersDives = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const diveList = await Dive.find({ diver: email });
    if (diveList.length < 1) {
      return res.status(404).json({ message: "Dive not found" });
    }
    res.status(200).json({ message: "Dive found", diveList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve dives" });
  }
};

export const getOneDive = async (req, res) => {
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
};

export const createNewDive = async (req, res) => {
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
    console.error(error);
    res.status(500).json({
      message: "Failed to save new dive",
      error: error.message,
    });
  }
};

export const updateDive = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDive = await Dive.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true,
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
};

export const deleteDive = async (req, res) => {
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
};

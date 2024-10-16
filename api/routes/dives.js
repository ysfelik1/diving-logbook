import express from "express";
import Dive from "../models/dive.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "GET /dives",
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  if (id) {
    res.status(200).json({
      message: "Parameter is " + id,
    });
  }
});

router.post("/", (req, res, next) => {
  const dive = new Dive({
    _id: new mongoose.Types.ObjectId(),
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

  dive
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "New dive saved",
        createdDive: dive,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({
        message: "New dive saved with ID: " + dive._id,
        createdDive: dive,
      });
    });
});

router.patch("/:id", (req, res, next) => {
  res.status(200).json({
    message: "Update dive",
  });
});

router.delete("/:id", (req, res, next) => {
  res.status(200).json({
    message: "Delete dive",
  });
});

export default router;

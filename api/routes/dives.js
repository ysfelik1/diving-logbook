import express from "express";
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
  const dive = {
    id: req.body.id,
    location: req.body.name,
    date: req.body.lastnName,
    diveSite: req.body.currentLevel,
    timeIn: req.body.country,
    timeOut: req.body.birthOfday,
    maxDepth: req.body.maxDepth,
    avgDepth: req.body.avgDepth,
    visibility: req.body.visibility,
    current: req.body.current,
    notes: req.body.notes,
  };

  res.status(201).json({
    message: "New dive saved :" + " " + id,
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

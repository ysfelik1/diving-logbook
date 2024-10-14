import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "GET /users",
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
  const user = {
    id: req.body.id,
    name: req.body.name,
    lastnName: req.body.lastnName,
    currentLevel: req.body.currentLevel,
    country: req.body.country,
    birthOfday: req.body.birthOfday,
  };

  res.status(201).json({
    message: "New created user:" + " " + user.id,
  });
});

router.patch("/:id", (req, res, next) => {
  res.status(200).json({
    message: "Update user",
  });
});

router.delete("/:id", (req, res, next) => {
  res.status(200).json({
    message: "Delete user",
  });
});

export default router;

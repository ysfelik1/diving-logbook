import express from "express";
import User from "../models/user.js";

const router = express.Router();

// GET /users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the database
    res.status(200).json({
      message: "List of users",
      users, // Send the list of users in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
});
// GET /users/:id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const user = await User.findById(id); // Retrieve the user from the database
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user" });
  }
});

// POST /users
router.post("/", async (req, res) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    lastName: req.body.lastName,
    currentLevel: req.body.currentLevel,
    country: req.body.country,
    birthOfday: req.body.birthOfday,
  });

  try {
    const result = await user.save(); // Save the user to the database
    console.log(result);
    res.status(201).json({
      message: "New user saved",
      createdUser: result,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      message: "Failed to save new user",
      error: error.message, // Include error message for more context
    });
  }
});

// PATCH /users/:id
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate fields against the schema
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
});

// DELETE /users/:id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export default router;

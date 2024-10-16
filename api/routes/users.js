import express from "express";
import User from "../models/user.js";
import argon2 from "argon2"; // Import argon2 for password hashing

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
  const { email, password, name, lastName, currentLevel, country, birthOfday } =
    req.body;

  try {
    const hashedPassword = await argon2.hash(password); // Hash the password
    const user = new User({
      email,
      password: hashedPassword, // Save the hashed password
      name,
      lastName,
      currentLevel,
      country,
      birthOfday,
    });

    const result = await user.save(); // Save the user to the database (SIGN UP)
    console.log("New user saved :" + result.name);
    res.status(201).json({
      message: "New user saved",
      createdUser: result.name,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging

    if (error.code === 11000) {
      // Handle duplicate key error
      res.status(409).json({
        message: "Email already exists",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Failed to save new user",
        error: error.message, // Include error message for more context
      });
    }
  }
});

// PATCH /users/:id
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { password } = req.body; // Extract password if provided

  try {
    // Hash the password if it's being updated
    if (password) {
      req.body.password = await argon2.hash(password);
    }

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

import User from "../models/user.js";
import argon2 from "argon2"; // Import argon2 for password hashing
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the database
    res.status(200).json({
      message: "List of users",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

export const getOneUser = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user" });
  }
};

export const createNewUser = async (req, res) => {
  const { email, password, name, lastName, currentLevel, country, birthOfday } =
    req.body;

  try {
    const hashedPassword = await argon2.hash(password); // Hash the password
    const user = new User({
      email,
      password: hashedPassword,
      name,
      lastName,
      currentLevel,
      country,
      birthOfday,
    });

    const result = await user.save(); // Save the user to the database
    console.log("New user saved :" + result.name);
    res.status(201).json({
      message: "New user saved",
      createdUser: result.name,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      res.status(409).json({
        message: "Email already exists",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Failed to save new user",
        error: error.message,
      });
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Verify the password using argon2
    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    } else {
      // If login is successful
      const token = jwt.sign(
        {
          email: user.email,
          Id: user._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      console.log("User logged in: " + user);
      return res.status(200).json({
        message: "Login successful",
        loggedInUser: user.name,
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;

  try {
    // Hash the password if it's being updated
    if (password) {
      req.body.password = await argon2.hash(password);
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true,
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
};

export const deleteUser = async (req, res) => {
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
};

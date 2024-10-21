import express from "express";

import checkAuth from "../middleware/checkAuth.js";
import {
  createNewUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  login,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", checkAuth, getAllUsers);
router.get("/:id", checkAuth, getOneUser);
router.post("/", createNewUser);
router.post("/login", login);
router.patch("/:id", checkAuth, updateUser);
router.delete("/:id", checkAuth, deleteUser);

export default router;

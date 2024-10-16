import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: req.body.email,
  name: req.body.name,
  lastName: req.body.lastName,
  currentLevel: req.body.currentLevel,
  country: req.body.country,
  birthOfday: req.body.birthOfday,
});

const User = mongoose.model("user", userSchema);

export default User;

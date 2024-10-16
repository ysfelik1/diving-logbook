import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  name: String,
  lastName: String,
  currentLevel: String,
  country: String,
  birthOfday: String,
});

const User = mongoose.model("user", userSchema);

export default User;

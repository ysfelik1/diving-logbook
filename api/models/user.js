import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: String,
  currentLevel: String,
  country: String,
  birthOfday: String,
});

const User = mongoose.model("user", userSchema);

export default User;

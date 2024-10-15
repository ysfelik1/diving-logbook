import mongoose from "mongoose";

const diveSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  location: String,
  date: String,
  diveSite: String,
  timeIn: String,
  timeOut: String,
  maxDepth: Number,
  avgDepth: Number,
  visibility: String,
  current: String,
  notes: String,
});

const Dive = mongoose.model("dive", diveSchema);

export default Dive;

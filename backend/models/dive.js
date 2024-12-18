import mongoose from "mongoose";

const diveSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  diver: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
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

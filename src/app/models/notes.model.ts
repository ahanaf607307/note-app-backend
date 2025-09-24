import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  desc: { type: String, trim: true },
  isCompleted: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});
export const Note = mongoose.model("Note", noteSchema);

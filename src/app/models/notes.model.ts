import mongoose, { Schema } from "mongoose";
import { INote } from "./../interfaces/notes.interface";

const noteSchema = new mongoose.Schema<INote>({
  title: { type: String, required: true, trim: true },
  desc: { type: String, trim: true },
  isCompleted: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export const Note = mongoose.model("Note", noteSchema);

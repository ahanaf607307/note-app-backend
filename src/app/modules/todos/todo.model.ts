import { model, Schema } from "mongoose";
import { ITodo } from "./todo.interface";
const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true, minLength: 6 },
  desc: { type: String },
  isCompleted: { type: Boolean, required: true, default: false },
  isDeleted: { type: Boolean, required: true, default: false },
});
export const Todo = model<ITodo>("todo", todoSchema);

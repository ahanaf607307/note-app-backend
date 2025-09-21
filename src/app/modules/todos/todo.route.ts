import { Router } from "express";
import {
  createTodo,
  findSingleTodo,
  getTodos,
  softDeleteTodo,
  updateSingleTodo,
} from "./todo.controller";

const todoRoute = Router();
todoRoute.post("/create-todo", createTodo);
todoRoute.delete("/soft-delete-todo/:todoId", softDeleteTodo);
todoRoute.get("/:todoId", findSingleTodo);
todoRoute.patch("/:todoId", updateSingleTodo);
todoRoute.get("/", getTodos);

export default todoRoute;

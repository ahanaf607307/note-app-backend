import { Request, Response } from "express";
import { Todo } from "./todo.model";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const todo = req.body;
    const newTodo = new Todo(todo);
    const savedTodo = await newTodo.save();
    res.send({
      success: true,
      message: "Todo created Successfully",
      data: savedTodo,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Todo created failed",
      error: { error },
    });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.find({ isDeleted: false });
    res.send({
      success: true,
      message: "Todo getting Successfully",
      todo,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Todo getting failed",
      error: { error },
    });
  }
};

export const findSingleTodo = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.todoId;
    const singleTodo = await Todo.findById(todoId);
    res.send({
      success: true,
      message: "Single todo getting Successfully",
      singleTodo,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Single todo getting failed",
      error: { error },
    });
  }
};

export const updateSingleTodo = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.todoId;
    const singleTodo = await Todo.findByIdAndUpdate(todoId, req.body, {
      new: true,
      runValidators: true,
    });
    res.send({
      success: true,
      message: "Single todo updated Successfully",
      singleTodo,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Single todo updated failed",
      error: { error },
    });
  }
};

export const softDeleteTodo = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: "Todo not found",
      });
    }

    todo.isDeleted = true;
    await todo.save();

    res.status(200).json({
      status: 200,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Todo delete failed",
      error: { error },
    });
  }
};

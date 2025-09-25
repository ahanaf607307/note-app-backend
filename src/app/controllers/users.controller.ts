import express, { Request, Response } from "express";
import { z } from "zod";
import { User } from "../models/users.model";

export const userRoutes = express.Router();

// Zod validation

const UserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  age: z.number(),
  role: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const userBody = await UserZodSchema.parseAsync(req.body);
    const userData = new User(userBody);
    const saveUser = await userData.save();
    res.send({
      status: 200,
      message: "User created successful",

      data: saveUser,
    });
  } catch (error: any) {
    res.send({
      success: false,
      status: 500,

      message: "User creating failed",
      error: { error },
    });
  }
});
// get user
userRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const saveUser = await User.find({ isDeleted: false });
    res.send({
      status: 200,
      message: "User getting successful",
      data: saveUser,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: "User getting failed",
      error: { error },
    });
  }
});

// get single user =>
userRoutes.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const findUser = await User.findById(userId);

    res.send({
      status: 200,
      message: "User getting successful",
      data: findUser,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: "User getting failed",
      error: { error },
    });
  }
});

// update single user =>
userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userBody = req.body;
    const findUser = await User.findByIdAndUpdate(userId, userBody, {
      new: true,
      runValidators: true,
    });

    res.send({
      status: 200,
      message: "User updated successful",
      data: findUser,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: "User updating failed",
      error: { error },
    });
  }
});

// delete single user ->

userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).send({
        success: false,
        message: "Note not found",
      });
    }
    findUser.isDeleted = true;
    await findUser.save();

    res.send({
      status: 200,
      message: "User deleted successful",
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: "User deleting failed",
      error: { error },
    });
  }
});

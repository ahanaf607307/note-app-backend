import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";

export const notesRoutes = express.Router();

// create note ->
notesRoutes.post("/create-note", async (req: Request, res: Response) => {
  try {
    const note = req.body;
    const noteData = new Note(note);
    const noteBody = await noteData.save();
    res.send({
      status: 200,
      message: "Note created successful",
      data: noteBody,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Note created failed",
      error: { error },
    });
  }
});

//  get note data ->
notesRoutes.get("", async (req: Request, res: Response) => {
  try {
    const noteData = await Note.find({ isDeleted: false });
    res.send({
      status: 200,
      message: "Note created successful",
      data: noteData,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: "Note getting failed",
      error: { error },
    });
  }
});

// get single note ->

notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
  try {
    const noteId = req.params.noteId;
    const findNote = await Note.findById(noteId);
    if (!findNote) {
      return res.status(404).json({
        status: 404,
        message: "Note not found",
      });
    }

    res.send({
      status: 200,
      message: "Note created successful",
      data: findNote,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 200,
      message: "Single Note  getting failed",
      error: { error },
    });
  }
});

// update single note ->
notesRoutes.patch(
  "/update-note/:noteId",
  async (req: Request, res: Response) => {
    try {
      const noteId = req.params.noteId;
      const findNote = await Note.findById(noteId);
      const noteBody = req.body;
      if (!findNote) {
        return res.send({
          success: false,
          status: 500,
          message: "Note not found",
        });
      }
      const updateNotes = await Note.findByIdAndUpdate(findNote, noteBody, {
        new: true,
        runValidators: true,
      });
      res.send({
        success: true,
        status: 200,
        message: "Note Updated successful",
        data: updateNotes,
      });
    } catch (error) {
      res.send({
        success: false,
        status: 500,
        message: "Note updated failed",
        error: { error },
      });
    }
  }
);

// delete single note ->

notesRoutes.delete(
  "/soft-delete/:noteId",
  async (req: Request, res: Response) => {
    try {
      const noteId = req.params.noteId;
      const findNote = await Note.findById(noteId);
      if (!findNote) {
        return res.status(404).send({
          success: false,
          message: "Note not found",
        });
      }
      findNote.isDeleted = true;
      await findNote?.save();

      res.send({
        success: true,
        status: 200,
        message: "Note deleted successful",
      });
    } catch (error) {
      res.send({
        success: false,
        status: 500,
        message: "Note deleted failed",
        error: { error },
      });
    }
  }
);

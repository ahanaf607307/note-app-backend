import express, { Application, Request, Response } from "express";
import { notesRoutes } from "./app/controllers/notes.controller";
import { userRoutes } from "./app/controllers/users.controller";

const app: Application = express();
app.use(express.json());

// start note app
app.use("/notes", notesRoutes);
app.use("/users", userRoutes);
// ends note app

app.get("/", (req: Request, res: Response) => {
  res.send("Server is runnig now ✅");
  console.log(req.body);
});
export default app;

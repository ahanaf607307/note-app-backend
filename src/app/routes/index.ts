import { Router } from "express";
import todoRoute from "../modules/todos/todo.route";

const routes = Router();

routes.use("/todos", todoRoute);

export default routes;

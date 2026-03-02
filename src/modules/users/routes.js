import { createUser } from "./controller.js";
import { Router } from "express";

const routes = Router();

routes.post("/users", createUser);

export default routes;

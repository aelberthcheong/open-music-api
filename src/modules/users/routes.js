import { createUser } from "./controller.js";
import { Router } from "express";

import { validatePayload } from "../../shared/middlewares/validate_middleware.js";
import { createUserSchema } from "./schema.js";

const routes = Router();

routes.post("/users", validatePayload(createUserSchema), createUser);

export default routes;

import { Router } from "express";
import {} from "./controller.js";
import {
    createAuthSchema,
    renewAccessTokenSchema,
    deleteAuthSchema,
} from "./schema.js";
import { validatePayload } from "../../shared/middlewares/validate_middleware.js";

const routes = Router();

routes.post("/authentications", validatePayload(createAuthSchema));
routes.put("/authentications", validatePayload(renewAccessTokenSchema));
routes.delete("/authentications", validatePayload(deleteAuthSchema));

export default routes;

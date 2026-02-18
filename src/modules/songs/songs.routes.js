import { Router } from "express";
import {
    createSong,
    getSong,
    getAllSong,
    editSong,
    deleteSong,
} from "./songs.controller.js";
import {
    songCreateSchema,
    songUpdateSchema,
    songQuerySchema,
} from "./songs.schema.js";
import {
    validatePayload,
    validateQuery,
} from "../../shared/middlewares/validate.middleware.js";

const routes = Router();

routes.post("/songs", validatePayload(songCreateSchema), createSong);
routes.get("/songs", validateQuery(songQuerySchema), getAllSong);
routes.get("/songs/:id", getSong);
routes.put("/songs/:id", validatePayload(songUpdateSchema), editSong);
routes.delete("/songs/:id", deleteSong);

export default routes;

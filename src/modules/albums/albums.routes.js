import { Router } from "express";
import {
    createAlbum,
    editAlbum,
    getAlbum,
    deleteAlbum,
} from "./albums.controller.js";

import { albumCreateSchema, albumUpdateSchema } from "./albums.schema.js";
import { validatePayload } from "../../shared/middlewares/validate.middleware.js";

const routes = Router();

routes.post("/albums", validatePayload(albumCreateSchema), createAlbum);
routes.get("/albums/:id", getAlbum);
routes.put("/albums/:id", validatePayload(albumUpdateSchema), editAlbum);
routes.delete("/albums/:id", deleteAlbum);

export default routes;

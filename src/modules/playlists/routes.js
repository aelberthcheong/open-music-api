import { Router } from "express";
import {
    createPlaylist,
    getAllPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    getSongsInPlaylist,
    deleteSongfromPlaylist,
} from "./controller.js";
import {
    createPlaylistSchema,
    addSongToPlaylistSchema,
    deleteSongFromPlaylistSchema,
} from "./schema.js";
import { validatePayload } from "../../shared/middlewares/validate_middleware.js";
import authMiddleware from "../../shared/middlewares/auth_middleware.js";

const routes = Router();

routes.post(
    "/playlists",
    authMiddleware,
    validatePayload(createPlaylistSchema),
    createPlaylist,
);
routes.get("/playlists", authMiddleware, getAllPlaylist);
routes.delete("/playlists/:id", authMiddleware, deletePlaylist);
routes.post(
    "/playlists/:id/songs",
    authMiddleware,
    validatePayload(addSongToPlaylistSchema),
    addSongToPlaylist,
);
routes.get("/playlists/:id/songs", authMiddleware, getSongsInPlaylist);
routes.delete(
    "/playlists/:id/songs",
    authMiddleware,
    validatePayload(deleteSongFromPlaylistSchema),
    deleteSongfromPlaylist,
);

export default routes;

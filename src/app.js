import express from "express";
import cors from "cors";

import AlbumsRoutes from "./modules/albums/routes.js";
import SongsRoutes from "./modules/songs/routes.js";
import UsersRoutes from "./modules/users/routes.js";
import authenticationsRoutes from "./modules/authentications/routes.js";
import playlistsRoutes from "./modules/playlists/routes.js";
import errorMiddleware from "./shared/middlewares/error_middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", AlbumsRoutes);
app.use("/", SongsRoutes);
app.use("/", UsersRoutes);
app.use("/", authenticationsRoutes);
app.use("/", playlistsRoutes);

// Error middleware harus berada pada urutan terakhir
app.use(errorMiddleware);

export default app;

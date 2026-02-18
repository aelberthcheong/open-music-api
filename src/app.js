import express from "express";
import cors from "cors";

import AlbumsRoutes from "./modules/albums/albums.routes.js";
import SongsRoutes from "./modules/songs/songs.routes.js";
import errorMiddleware from "./shared/middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", AlbumsRoutes);
app.use("/", SongsRoutes);

// Error middleware harus berada pada urutan terakhir
app.use(errorMiddleware);

export default app;

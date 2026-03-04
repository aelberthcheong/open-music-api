import Joi from "joi";

export const createPlaylistSchema = Joi.object({
    name: Joi.string().required(),
});

export const addSongToPlaylistSchema = Joi.object({
    songId: Joi.string().required(),
});

export const deleteSongFromPlaylistSchema = Joi.object({
    songId: Joi.string().required(),
});

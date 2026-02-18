import Joi from "joi";

export const songCreateSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required(),
    genre: Joi.string().required(),
    performer: Joi.string().required(),
    duration: Joi.number().optional(),
    albumId: Joi.string().optional(),
});

export const songUpdateSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required(),
    genre: Joi.string().required(),
    performer: Joi.string().required(),
    duration: Joi.number().optional(),
    albumId: Joi.string().optional(),
});

export const songQuerySchema = Joi.object({
    title: Joi.string().optional(),
    performer: Joi.string().optional(),
});

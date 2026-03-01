import Joi from "joi";

export const albumCreateSchema = Joi.object({
    name: Joi.string().required(),
    year: Joi.number().required(),
});

export const albumUpdateSchema = Joi.object({
    name: Joi.string().required(),
    year: Joi.number().required(),
});

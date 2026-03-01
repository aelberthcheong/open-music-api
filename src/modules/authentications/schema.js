import Joi from "joi";

export const createAuthSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const renewAccessTokenSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

export const deleteAuthSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

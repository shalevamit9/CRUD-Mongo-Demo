import { RequestHandler } from "express";
import Joi from "joi";

export const createUserSchema = Joi.object({
    first_name: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .required(),
    last_name: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .min(9)
        .max(10)
        .pattern(/^[0-9]+$/)
        .required(),
});

export const updateUserSchema = Joi.object({
    first_name: Joi.string().pattern(/^[a-zA-Z]+$/),
    last_name: Joi.string().pattern(/^[a-zA-Z]+$/),
    email: Joi.string().email(),
    phone: Joi.string()
        .min(9)
        .max(10)
        .pattern(/^[0-9]+$/),
});

export const paginationSchema = Joi.object({
    limit: Joi.number(),
    page: Joi.number(),
});

/* optional generic validation middleware */
export function validateSchema(
    validationSchema: Joi.ObjectSchema<unknown>,
    validationKey: "body" | "query"
): RequestHandler {
    return async function (req, res, next) {
        await validationSchema.validateAsync(req[validationKey]);
        next();
    };
}

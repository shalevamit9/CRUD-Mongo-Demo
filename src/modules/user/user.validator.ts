import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";

const createUserValidationSchema = Joi.object({
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

const updateUserValidationSchema = Joi.object({
    first_name: Joi.string().pattern(/^[a-zA-Z]+$/),
    last_name: Joi.string().pattern(/^[a-zA-Z]+$/),
    email: Joi.string().email(),
    phone: Joi.string()
        .min(9)
        .max(10)
        .pattern(/^[0-9]+$/),
});

const paginationValidationSchema = Joi.object({
    limit: Joi.number(),
    page: Joi.number(),
});

export async function validateCreateUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    await createUserValidationSchema.validateAsync(req.body);
    next();
}

export async function validateUpdateUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    await updateUserValidationSchema.validateAsync(req.body);
    next();
}

export async function validatePagination(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // option 1 - validate normalize and attach to request
    // const normalizedQuery = await paginationValidator.validateAsync(req.query);
    // req.query = normalizedQuery;
    // next();

    // option 2 - validate only, and casting will be the controllers job
    await paginationValidationSchema.validateAsync(req.query);
    next();
}

/* optional generic validation middleware */
// export function validateSchema(
//     validatorSchema: Joi.ObjectSchema<unknown>
// ): RequestHandler {
//     return async function (req, res, next) {
//         await validatorSchema.validateAsync(req.body);
//         next();
//     };
// }

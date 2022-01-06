import Joi from "joi";

const createUserValidator = Joi.object({
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

const updateUserValidator = Joi.object({
  first_name: Joi.string().pattern(/^[a-zA-Z]+$/),
  last_name: Joi.string().pattern(/^[a-zA-Z]+$/),
  email: Joi.string().email(),
  phone: Joi.string()
    .min(9)
    .max(10)
    .pattern(/^[0-9]+$/),
});

const paginationValidator = Joi.object({
  limit: Joi.number(),
  page: Joi.number(),
});

export async function validateCreateUser(req, res, next) {
  await createUserValidator.validateAsync(req.body);
  next();
}

export async function validateUpdateUser(req, res, next) {
  await updateUserValidator.validateAsync(req.body);
  next();
}

export async function validatePagination(req, res, next) {
  const normalizedQuery = await paginationValidator.validateAsync(req.query);
  req.query = normalizedQuery;
  next();
}

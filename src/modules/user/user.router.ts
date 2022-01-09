import raw from '../../middleware/route.async.wrapper.js';
import userController from './user.controller.js';
import express from 'express';
import { validateSchema } from '../../middleware/validate.schema.middleware.js';
import {
  createUserSchema,
  paginationSchema,
  updateUserSchema
} from './user.validation.schemas.js';

class UserRouter {
  private readonly _router = express.Router();

  constructor() {
    this._router.get(
      '/',
      raw(validateSchema(paginationSchema, 'query')),
      raw(userController.getAllUsers)
    );

    this._router.get('/:id', raw(userController.getUserById));

    this._router.post(
      '/',
      raw(validateSchema(createUserSchema, 'body')),
      raw(userController.createUser)
    );

    this._router.put(
      '/:id',
      raw(validateSchema(updateUserSchema, 'body')),
      raw(userController.updateUser)
    );

    this._router.delete('/:id', raw(userController.deleteUser));
  }

  get router() {
    return this._router;
  }
}

const userRouter = new UserRouter();

export default userRouter;

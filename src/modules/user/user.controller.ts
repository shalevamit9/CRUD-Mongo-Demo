import { RequestHandler } from "express";
import { UrlNotFoundException } from "../../exceptions/urlNotFound.exception.js";
import { ResponseMessage } from "../../types/messages.interface.js";
import { ICreateUserDto, IUpdateUserDto } from "./user.interface.js";
import * as userService from "./user.service.js";

export const getAllUsers: RequestHandler = async (req, res) => {
    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 5;

    const users = await userService.getAllUsers(page, limit);

    const response: ResponseMessage = {
        status: 200,
        message: "success",
        data: { users },
    };

    res.status(response.status).json(response);
};

export const getUserById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    if (!user) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
        status: 200,
        message: "success",
        data: { user },
    };

    res.status(response.status).json(response);
};

export const createUser: RequestHandler = async (req, res) => {
    const userDto: ICreateUserDto = req.body;
    const user = await userService.createUser(userDto);

    const response: ResponseMessage = {
        status: 201,
        message: "success",
        data: { user },
    };

    res.status(response.status).json(response);
};

export const updateUser: RequestHandler = async (req, res, next) => {
    const userDto: IUpdateUserDto = req.body;
    const { id } = req.params;

    const user = await userService.updateUser(id, userDto);
    if (!user) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
        status: 204,
        message: "success",
        data: { user },
    };

    res.status(response.status).json(response);
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const user = await userService.deleteUser(id);
    if (!user) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
        status: 204,
        message: "success",
        data: { user },
    };

    res.status(response.status).json(response);
};

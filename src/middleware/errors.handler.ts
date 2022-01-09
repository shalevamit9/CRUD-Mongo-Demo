import { NextFunction, Request, RequestHandler, Response } from "express";
import log from "@ajar/marker";
import { ErrorMessage } from "../types/messages.interface.js";
import { HttpException } from "../exceptions/http.execption.js";
import { UrlNotFoundException } from "../exceptions/urlNotFound.exception.js";

const { NODE_ENV } = process.env;

type ErrorMiddleware = (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => ReturnType<RequestHandler>;

export const printError: ErrorMiddleware = (err, req, res, next) => {
    log.error(err);
    next(err);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorResponse: ErrorMiddleware = (err, req, res, next) => {
    const response: ErrorMessage = {
        message: err.message || "internal server error...",
        status: err.status || 500,
    };

    if (NODE_ENV !== "production") {
        response.stack = err.stack;
    }

    res.status(response.status).json(response);
};

export const urlNotFound: RequestHandler = (req, res, next) => {
    next(new UrlNotFoundException(req.originalUrl));
};

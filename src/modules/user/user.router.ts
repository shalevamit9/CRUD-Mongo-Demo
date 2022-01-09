import raw from "../../middleware/route.async.wrapper.js";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "./user.controller.js";
import express from "express";
import {
    createUserSchema,
    paginationSchema,
    updateUserSchema,
    validateSchema,
} from "./user.validator.js";

const router = express.Router();

// GET ALL USERS
router.get(
    "/",
    raw(validateSchema(paginationSchema, "query")),
    raw(getAllUsers)
);

// GETS A SINGLE USER
router.get("/:id", raw(getUserById));

// CREATES A NEW USER
router.post(
    "/",
    raw(validateSchema(createUserSchema, "body")),
    raw(createUser)
);

// UPDATES A SINGLE USER
router.put(
    "/:id",
    raw(validateSchema(updateUserSchema, "body")),
    raw(updateUser)
);

// DELETES A USER
router.delete("/:id", raw(deleteUser));

export default router;

/* 
  if there is an error thrown in the DB, asyncMiddleware
  will pass it to next() and express will handle the error */
import raw from "../../middleware/route.async.wrapper.js";
import user_model from "./user.model.js";
import express from "express";
import {
  validateCreateUser,
  validateUpdateUser,
  validatePagination,
} from "./user.validator.js";

const router = express.Router();

// parse json req.body on post routes
router.use(express.json());

// CREATES A NEW USER
// router.post("/", async (req, res,next) => {
//    try{
//      const user = await user_model.create(req.body);
//      res.status(200).json(user);
//    }catch(err){
//       next(err)
//    }
// });

// CREATES A NEW USER
router.post(
  "/",
  raw(validateCreateUser),
  raw(async (req, res) => {
    const user = await user_model.create(req.body);
    res.status(200).json(user);
  })
);

// GET ALL USERS
router.get(
  "/",
  raw(validatePagination),
  raw(async (req, res) => {
    const { limit = 5, page = 0 } = req.query;
    const amountToSkip = page * limit;
    console.log("skip", amountToSkip);
    console.log("typeof", typeof amountToSkip);
    const users = await user_model
      .find()
      .skip(amountToSkip)
      .limit(limit)
      .select(`-_id first_name last_name email phone`);
    res.status(200).json(users);
  })
);

// GETS A SINGLE USER
router.get(
  "/:id",
  raw(async (req, res) => {
    const user = await user_model.findById(req.params.id);
    // .select(`-_id
    //     first_name
    //     last_name
    //     email
    //     phone`);
    if (!user) return res.status(404).json({ status: "No user found." });
    res.status(200).json(user);
  })
);
// UPDATES A SINGLE USER
router.put(
  "/:id",
  raw(validateUpdateUser),
  raw(async (req, res) => {
    const user = await user_model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      upsert: false,
    });
    res.status(200).json(user);
  })
);

// DELETES A USER
router.delete(
  "/:id",
  raw(async (req, res) => {
    const user = await user_model.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).json({ status: "No user found." });
    res.status(200).json(user);
  })
);

export default router;

import express from "express";
import { userSignup, userLogin, getUsers, getUser } from "../controllers/user.controller";
import { auth, validator, checkValidMongoId } from "../middleware";
import { signupSchema, loginSchema } from "../validators/user.validator";
import { commonQueryJoiSchema } from "../validators";

const router = express.Router();

router.post('/signup', [validator(signupSchema)], userSignup);
router.post('/login', [validator(loginSchema)], userLogin);
router.get('/', [auth, validator(commonQueryJoiSchema, 'query')], getUsers);
router.get('/:id', [checkValidMongoId, auth], getUser);

export default router;

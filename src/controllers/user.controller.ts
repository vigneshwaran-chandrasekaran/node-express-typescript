import { Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import HttpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { UserModel } from "../models/user.model";
import { ERRORS } from "../utils/constants";
import { env } from "../utils";

const JWT_PRIVATE_KEY = env.JWT_PRIVATE_KEY;

const LIMIT: number = 10;

interface Query {
  page?: number;
  all?: boolean | string;
  pageSize?: number;
}

async function checkIfUserExists(mobile: number, email: string) {
  try {
    return await UserModel.findOne({ $or: [{ mobile }, { email }] });
  } catch (error) {
    return error;
  }
}

async function checkValidUser(email: string) {
  try {
    return await UserModel.findOne({ email });
  } catch (error) {
    return error;
  }
}

export const getUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (user) {
      return res.status(HttpStatus.OK).json({ data: user });
    }
    return res.status(HttpStatus.NOT_FOUND).json({ errors: "User not found" });
  } catch (error) {
    return next(error);
  }
};

export const getUsers = async (req: any, res: Response, next: NextFunction) => {
  try {
    let { page = 1 }: Query = req.query;
    const { all = false, pageSize = LIMIT }: Query = req.query;

    if (all === "true") {
      /**
       * all = true, show all records
       */
      const users = await UserModel.find().sort({ _id: -1 });

      return res.json({
        data: users,
        meta: {
          total: users.length,
        },
      });
    }

    if (Number.isNaN(page) || page < 1) {
      page = 1;
    }

    const startIndex = (Number(page) - 1) * pageSize; // get the starting index of every page
    const total = await UserModel.countDocuments({});
    const users = await UserModel.find()
      .select(["-password"])
      .sort({ _id: -1 })
      .limit(pageSize)
      .skip(startIndex);

    return res.json({
      data: users,
      meta: {
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / pageSize),
        total,
        pageSize,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const userSignup = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.validInputs;
    const { mobile, email, password } = user;
    const alreadyExists: any = await checkIfUserExists(mobile, email);

    if (alreadyExists?._id) {
      const errors: any = {};
      if (mobile === alreadyExists.mobile) {
        errors.mobile = ERRORS.users.mobile;
      }
      if (email === alreadyExists.email) {
        errors.email = ERRORS.users.email;
      }

      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        errors,
      });
    }

    if (password.toLowerCase().includes("   ")) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        errors: {
          password: 'Passwords should not contain the word "password"',
        },
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser: any = await UserModel.create({
      ...user,
      password: hashedPassword,
    });

    newUser = newUser.toObject();
    delete newUser.password;

    return res.status(HttpStatus.CREATED).json({ data: newUser });
  } catch (error) {
    return next(error);
  }
};

export const userLogin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.validInputs;

    let user: any = await checkValidUser(email);

    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        errors: ERRORS.users.notAvailable,
      });
    }

    if (user?._id) {
      const checkValidPassword = await bcrypt.compare(password, user.password);
      if (!checkValidPassword) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          errors: ERRORS.users.inValid,
        });
      }
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        isAdmin: user.isAdmin,
      },
      JWT_PRIVATE_KEY,
      { expiresIn: "12h" }
    );

    user = _.assign(user.toObject(), { accessToken });

    return res.json({
      data: _.omit(user, ["password", "__v"]),
    });
  } catch (error) {
    return next(error);
  }
};

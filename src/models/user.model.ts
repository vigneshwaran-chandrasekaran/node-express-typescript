import { prop, getModelForClass } from "@typegoose/typegoose";
import { mobileMin, mobileMax } from "../utils/constants";
export class User {
  @prop({
    required: [true, "First name is required"],
    trim: true,
    lowercase: true,
  })
  public firstName!: string;

  @prop({
    required: [true, "Last name is required"],
    trim: true,
    lowercase: true,
  })
  public lastName!: string;

  @prop({
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (value: string) => /\S+@\S+\.\S+/.test(value),
      message: "Email is not in a valid format",
    },
  })
  public email!: string;

  @prop({
    required: [true, "First name is required"],
    minlength: 7,
    validate(value: string) {
      if (value.toLowerCase().includes("password")) {
        throw new Error(' Passwords should not contain the word "password" ');
      }
    },
  })
  public password!: string;

  @prop({
    required: true,
    min: mobileMin,
    max: mobileMax,
    unique: true,
  })
  public mobile!: number;

  @prop({
    required: false,
    default: false,
    trim: true,
    lowercase: true,
  })
  public isAdmin!: boolean;
}

export const UserModel = getModelForClass(User);

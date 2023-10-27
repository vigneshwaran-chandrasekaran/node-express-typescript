import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
  @prop({ required: [true, "Name is required"], trim: true, lowercase: true })
  public firstName!: string;

  @prop({
    required: [true, "Email is required"],
    validate: {
      validator: (value: string) => /\S+@\S+\.\S+/.test(value),
      message: "Email is not in a valid format",
    },
  })
  public email!: string;
}

export const UserModel = getModelForClass(User);

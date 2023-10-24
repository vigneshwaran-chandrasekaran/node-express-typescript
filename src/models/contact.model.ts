import { prop, getModelForClass } from "@typegoose/typegoose";
import { mobileMin, mobileMax } from '../utils/constants';

export class Contact {
  @prop({ required: false, trim: true, lowercase: true  })
  public name!: string;

  @prop({ required: true, trim: true, lowercase: true })
  public email!: string;

  @prop({ required: false, min: mobileMin, max: mobileMax  })
  public mobile!: string;

  @prop({ required: false, trim: true, lowercase: true })
  public message!: string;

  @prop({ required: false, default: false })
  public isNewsLetter?: boolean;
}

export const ContactModel = getModelForClass(Contact);
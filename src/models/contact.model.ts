import { prop, getModelForClass } from "@typegoose/typegoose";

export class Contact {
  @prop({ required: false, trim: true, lowercase: true  })
  public name!: string;

  @prop({ required: true, trim: true, lowercase: true })
  public email!: string;

  @prop({ required: false, maxlength: 10, minlength: 10  })
  public mobile!: string;

  @prop({ required: false, trim: true, lowercase: true })
  public message!: string;

  @prop({ required: false, default: false })
  public isNewsLetter?: boolean;
}

export const ContactModel = getModelForClass(Contact);
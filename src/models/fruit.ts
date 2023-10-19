import { prop, getModelForClass } from "@typegoose/typegoose";

export class Fruit {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: false, default: true })
  public isOutOfStock?: boolean;
}

export const FruitModel = getModelForClass(Fruit);

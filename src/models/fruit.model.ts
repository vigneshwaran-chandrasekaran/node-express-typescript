import { prop, getModelForClass, ReturnModelType } from "@typegoose/typegoose";

export class Fruit {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: false, default: true })
  public isOutOfStock?: boolean;

  // the "this" definition is required to have the correct types
  public static async findByFruitName(
    this: ReturnModelType<typeof Fruit>,
    name: string
  ) {
    return this.find({ name: { $regex: new RegExp(name, "i") } }).exec();
  }
}

export const FruitModel: ReturnModelType<typeof Fruit> =
  getModelForClass(Fruit);

import {
  prop,
  post,
  pre,
  getModelForClass,
  ReturnModelType,
} from "@typegoose/typegoose";

/**
 * This will execute before the save call execute
 */ @pre<Fruit>("save", function () {
  this.isLowPrice = this.price < 5;
})
/**
 * This will execute after the save call done
 */
@post<Fruit>("save", function (fruit) {
  console.log(fruit);
  console.log("We have a new fruit here.");
})
export class Fruit {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: false, default: true })
  public isOutOfStock?: boolean;

  @prop({ required: false, default: false })
  public isLowPrice?: boolean;

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

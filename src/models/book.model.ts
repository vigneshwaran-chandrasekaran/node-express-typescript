import { prop, post, pre, getModelForClass } from "@typegoose/typegoose";

/**
 * This will execute before the save call execute
 */
@pre<Book>("save", function () {
  console.log("Before save", this);
})
/**
 * This will execute after the save call done
 */
@post<Book>("save", function (book) {
  console.log(book);
  console.log("We have a new book here.");
})
export class Book {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public author!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: false, default: true })
  public isOutOfStock?: boolean;
}

export const BookModel = getModelForClass(Book);

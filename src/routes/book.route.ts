import express from "express";
import { getBooks, getBook, createBook } from "../controllers/book.controller";
import { validator, checkValidMongoId } from "../middleware";
import { commonQueryJoiSchema } from "../validators";
import { bookJoiSchema } from '../validators/book.validator';

const router = express.Router();

router.get("/", [validator(commonQueryJoiSchema, "query")], getBooks);
router.get('/:id', [checkValidMongoId], getBook);
router.post('/', [validator(bookJoiSchema)], createBook);

export default router;

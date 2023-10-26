import express from "express";
import { getBooks, getBook, createBook, updateBook, deleteBook } from "../controllers/book.controller";
import { validator, checkValidMongoId } from "../middleware";
import { commonQueryJoiSchema } from "../validators";
import { bookJoiSchema } from '../validators/book.validator';

const router = express.Router();

router.get("/", [validator(commonQueryJoiSchema, "query")], getBooks);
router.get('/:id', [checkValidMongoId], getBook);
router.post('/', [validator(bookJoiSchema)], createBook);
router.put('/:id', [checkValidMongoId, validator(bookJoiSchema)], updateBook);
router.delete('/:id', [checkValidMongoId], deleteBook);

export default router;

import express from "express";
import { getBooks, getBook, createBook } from "../controllers/book.controller";
import { validator, checkValidMongoId } from "../middleware";
import { commonQueryJoiSchema } from "../validators";

const router = express.Router();

router.get("/", [validator(commonQueryJoiSchema, "query")], getBooks);
router.get('/:id', [checkValidMongoId], getBook);
router.post("/", createBook);

export default router;

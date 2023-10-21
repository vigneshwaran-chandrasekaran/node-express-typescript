import express from "express";
import { getBooks } from "../controllers/book.controller";

const router = express.Router();

router.get("/", getBooks);

export default router;

import { addNewBook, getAllBook, getBookById } from "../Controllers/Book.controller.js";
import express from 'express'

const router = express.Router();

router.post("/add", addNewBook);
router.get("/get", getAllBook);
router.get("/getbook/:id",getBookById)

export default router
import express from 'express'
import { addBookToCart, getusercart,  removecart } from '../Controllers/Cart.controller.js';

const router = express.Router()

router.post("/add/book",addBookToCart)
router.get("/get", getusercart)
router.post("/remove",removecart)
export default router
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Database/DbConfig.js';
import userRouter from './Routers/User.router.js';
import bookRouter from './Routers/Book.router.js';
import cartRouter from './Routers/Cart.router.js';
import paymentRouter from './Routers/Payment.router.js';
 import { isAuthenticated } from './Middleware/AuthMiddleware.js';
dotenv.config();
const app = express();
const port = process.env.PORT;
connectDB();




app.use(cors());
app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

app.use("/api/user",userRouter,)
app.use("/api/book",isAuthenticated,bookRouter)
app.use("/api/cart", isAuthenticated, cartRouter)
app.use ("/api/payment",isAuthenticated,paymentRouter)

app.listen(port, () =>
{ console.log("App is listening with port", port) })
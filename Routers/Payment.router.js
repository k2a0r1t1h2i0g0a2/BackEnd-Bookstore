import express, { Router } from "express";
import { checkout, paymentVerification } from "../Controllers/Payment.controller.js";

const router = express.Router();

router.post("/checkout", checkout);
router.post("/verification",paymentVerification)


export default router
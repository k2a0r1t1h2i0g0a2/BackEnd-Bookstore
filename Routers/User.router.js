import { signUp,login ,resetPassword, } from "../Controllers/User.controller.js";
import express from 'express'
  
const router = express.Router()

router.post("/signup", signUp);
router.post("/login", login);
router.post("/resetpassword", resetPassword);
export default router;


// {
//     "username":"karthiga",
//     "email":"karthiga@gmail.com",
//     "password":"karthikrish"
// }
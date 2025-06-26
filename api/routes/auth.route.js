import express from "express"
import {register, login, logout} from "../controllers/auth.controller.js";

const router = express.Router();
console.log("line before register")

router.post("/register" , register);
console.log("line after register")

router.post("/login" , login);
router.post("/logout" , logout);

export default router;


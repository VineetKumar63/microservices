import express from "express";
import { addUser, login, userVerify } from "../controllers/AuthController.js";
import authMiddlware from "../middleware/authMiddleware.js";

const AuthRoute = express.Router()

AuthRoute.post('/auth/register', addUser)
AuthRoute.post('/auth/login', login)
AuthRoute.post('/auth/verify', authMiddlware, userVerify)

export default AuthRoute
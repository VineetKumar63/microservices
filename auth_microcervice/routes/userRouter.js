import express from "express";
import {getAllUsers, getUser} from "../controllers/userController.js";


const UserRoute = express.Router()

UserRoute.post('/user/getUser/:id', getUser)
UserRoute.post('/user/getallUser', getAllUsers)

export default UserRoute
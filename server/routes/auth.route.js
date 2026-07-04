import express from 'express'
import{logOut} from '../controllers/auth.controller.js'
import { googleAuth } from '../controllers/auth.controller.js'
const authRoute=express.Router();

authRoute.post("/google",googleAuth);
authRoute.get("/logout",logOut);

export default authRoute;
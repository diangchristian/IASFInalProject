import { Router } from "express";
import { signUp, signIn } from "../controller/auth.controller";
const authRouter = Router();




authRouter.post("/register", signUp);

authRouter.post("/login", signIn);


export default authRouter;
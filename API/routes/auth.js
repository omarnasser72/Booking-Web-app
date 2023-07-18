import Express from "express";
import { login, register } from "../controllers/authenticationController.js";

const router = Express.Router();

//REGISTER
router.post("/register", register);
//LOGIN
router.post("/login", login);
export default router;

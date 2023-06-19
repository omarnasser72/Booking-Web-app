import Express from "express";
import { login, register } from "../controllers/authenticationController.js";

const router = Express.Router();

//REGISTER
router.post("/register", register);
//LOGIN
router.get("/login", login);
export default router;

import Express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyUser.js";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { getAllHotles } from "../controllers/hotelController.js";

const router = Express.Router();

router.get("/checkAuthentication", verifyToken, (req, res, next) => {
  res.send("user logged in");
});

router.get("/checkUser/:id", verifyUser, (req, res, next) => {
  res.send("user logged in and you can delete account");
});

router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
  res.send("admin logged in and can delete all accounts");
});

//UPDATE
router.put("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GETALL
router.get("/", verifyAdmin, getAllHotles);
export default router;

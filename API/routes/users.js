import Express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyUser.js";
import {
  changePwd,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";

import {
  deleteReservation,
  getUserReservations,
} from "../controllers/reservationController.js";

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
router.put("/:id", updateUser);
router.put("/changePwd/:id", changePwd);
//DELETE
router.delete("/:id", verifyAdmin, deleteUser);
//GET
router.get("/:id", getUser);
//GETALL
router.get("/", verifyAdmin, getAllUsers);

//GET RESERVATION
router.get("/reservations/:id", getUserReservations);

//DELETE RESERVATION
router.delete("/reservations/:id", deleteReservation);

export default router;

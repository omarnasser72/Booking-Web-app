import Express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotles,
  getHotel,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyUser.js";

const router = Express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);
//UPDATE
router.put("/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//GET
router.get("/find/:id", getHotel);
//GETALL
router.get("/", getAllHotles);

//-----------------------

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;

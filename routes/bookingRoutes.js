import express from "express";
import authCheck from "../middlewares/authCheck.js";
import { add, list, myBookings, view } from "../controllers/v1/bookingController.js";

const router = express.Router()

router.post("/details",list)
router.use(authCheck);

router.post("/add",add)
router.post('/view',view)
router.post('/mybookings',myBookings)

export default router
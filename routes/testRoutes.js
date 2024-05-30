import express from "express";
import { addRating, addVenue } from "../controllers/test/testController.js"

const router = express.Router()

router.post("/addVenue",addVenue)
router.post("/addRating",addRating)

export default router

import express from "express";
import { createEvent, deleteEvent, editEvent, listEvents, viewEvent } from "../controllers/v1/eventController.js";
import authCheck from "../middlewares/authCheck.js";
import { upload } from "../middlewares/multer/fileUpload.js";
import { check } from "express-validator";

const router = express.Router()

router.post("/list",listEvents)
router.post("/view",viewEvent)

router.use(authCheck);

router.post("/create", upload.single('image'),
[
  check('title').not().isEmpty(),
  check('start_date').not().isEmpty(),
  check('end_date').not().isEmpty(),
  check('moment').not().isEmpty(),
  check('description').not().isEmpty(),
  check('totalTickets').not().isEmpty(),
  check('duration').not().isEmpty(),
], createEvent);

router.patch("/delete",[check('event_id').not().isEmpty()], deleteEvent)

router.patch("/edit", upload.single('image'), editEvent)


export default router

import express from "express";
import { getAllEvents, getSingleEvent} from "../controller/eventController.js";


const router = express.Router();


router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);


export default router;

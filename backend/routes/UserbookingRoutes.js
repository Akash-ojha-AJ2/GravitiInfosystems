import express from "express";
import { createBooking, getUserMyBookings } from "../controller/UserbookingController.js";
import { protect,isAdmin } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();


router.post("/", protect, upload.single("paymentScreenshot"), createBooking);
router.get("/my-booking", protect, getUserMyBookings );


export default router;

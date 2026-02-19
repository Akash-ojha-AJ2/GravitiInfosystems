import express from "express";
import { getAllBookingsAdmin,updateBookingStatus  } from "../controller/AdminBookingController.js";
import { protect,isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();



router.get("/admin/all", protect, isAdmin, getAllBookingsAdmin);
router.put(
  "/admin/update/:bookingId",
  protect,
  isAdmin,
  updateBookingStatus
);

export default router;



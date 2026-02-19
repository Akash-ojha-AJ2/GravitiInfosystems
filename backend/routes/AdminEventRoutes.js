import express from "express";
import {getAllEventsAdmin, createEvent,  updateEvent, deleteEvent } from "../controller/AdminEventController.js";
import upload from "../middlewares/upload.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();




router.get("/admin/all", protect, isAdmin, getAllEventsAdmin);
router.post("/add", protect,isAdmin, upload.single("image"), createEvent);
router.put("/:id",protect, isAdmin,upload.single("image"),updateEvent);
router.delete("/:id", protect, isAdmin, deleteEvent);

export default router;

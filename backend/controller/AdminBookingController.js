import Booking from "../models/Booking.js";
import mongoose from "mongoose";
import { io } from "../server.js";


export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(bookingId).populate("event_id");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Booking already processed" });
    }

    const event = booking.event_id;


    if (status === "confirmed") {
      booking.status = "confirmed";
    }


    if (status === "cancelled") {
      booking.status = "cancelled";
      event.availableSeats += booking.quantity;
      await event.save();
    }

    await booking.save();

    io.emit("seatUpdated", {
      eventId: event._id,
      availableSeats: event.availableSeats,
    });

    res.json({
      success: true,
      message: `Booking ${status} successfully`,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("event_id")
      .populate("user_id", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


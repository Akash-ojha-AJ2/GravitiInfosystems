import Booking from "../models/Booking.js";
import Event from "../models/EventsModel.js";
import { io } from "../server.js";

export const createBooking = async (req, res) => {
  try {
    const { event_id, name, email, mobile, quantity } = req.body;
    const user_id = req.user._id;

    const event = await Event.findById(event_id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats < quantity) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const totalAmount = quantity * event.price;

    const booking = await Booking.create({
      event_id,
      user_id,
      name,
      email,
      mobile,
      quantity,
      totalAmount,
      paymentScreenshot: req.file?.path,
      status: "pending",
    });

    event.availableSeats -= quantity;
    await event.save();

    io.emit("seatUpdated", {
      eventId: event._id,
      availableSeats: event.availableSeats,
    });

    res.status(201).json({
      success: true,
      message: "Booking created",
      booking,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getUserMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ user_id: userId })
      .populate("event_id") 
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




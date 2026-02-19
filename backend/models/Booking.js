import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    mobile: { type: String, required: true },

    quantity: { type: Number, required: true, min: 1 },

    totalAmount: { type: Number, required: true },

    paymentScreenshot: {
      type: String,
      required: true,
    },


    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);


const Booking = mongoose.model("Booking", bookingSchema);


export default Booking
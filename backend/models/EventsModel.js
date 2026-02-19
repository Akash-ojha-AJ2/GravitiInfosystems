import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true
    },
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    date: {
      type: Date,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // image URL
      required: true,
    },
    eventCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    }
  },
  { timestamps: true }
);


eventSchema.index({ geometry: '2dsphere' });

const Event = mongoose.model("Event", eventSchema);

export default Event;
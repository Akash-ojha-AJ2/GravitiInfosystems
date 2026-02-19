import Event from "../models/EventsModel.js";
import NodeGeocoder from "node-geocoder";
import cloudinary from "../config/cloudinary.js";


const options = {
  provider: "openstreetmap",
  httpAdapter: "https",
  formatter: null,
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
      headers: {
        "User-Agent": "MyEventApp/1.0 (akashojha558@gmail.com)",
      },
    });
  },
};

const geocoder = NodeGeocoder(options);



export const createEvent = async (req, res) => {
  try {
    const { address } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const geoData = await geocoder.geocode(address);

    if (!geoData || geoData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid address",
      });
    }

    const latitude = geoData[0].latitude;
    const longitude = geoData[0].longitude;

    const event = await Event.create({
      ...req.body,
      image: req.file.path,
      eventCreator: req.user._id,
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating event",
    });
  }
};



export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (req.body.address) {

      const geoData = await geocoder.geocode(req.body.address);

      if (geoData && geoData.length > 0) {
        event.geometry = {
          type: "Point",
          coordinates: [
            geoData[0].longitude,
            geoData[0].latitude,
          ],
        };
      }
    }


    if (req.file) {
      if (event.image) {
        const publicId = event.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`events/${publicId}`);
      }

      event.image = req.file.path;
    }


    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.category = req.body.category || event.category;
    event.address = req.body.address || event.address;
    event.date = req.body.date || event.date;
    event.totalSeats = req.body.totalSeats || event.totalSeats;
    event.availableSeats = req.body.availableSeats || event.availableSeats;
    event.price = req.body.price || event.price;

    await event.save();

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};



export const deleteEvent = async (req, res) => {
  try {

    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






export const getAllEventsAdmin = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

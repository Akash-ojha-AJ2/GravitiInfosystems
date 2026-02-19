// seedEvents.js
import mongoose from "mongoose";
import dotenv from "dotenv";

import Event from "./models/EventsModel.js"; // path check kar lena
import dummyEvents from "./DummyEvents.js";

dotenv.config(); // 🔥 MOST IMPORTANT LINE

const MONGODB_URI = process.env.MONGO_URI; // 🔥 correct name

const seedDatabase = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGO_URI not found in .env file");
    }

    await mongoose.connect(MONGODB_URI,{
        dbName:"ticketbookingApp"
    });
    console.log("✅ Connected to MongoDB");

    await Event.deleteMany({});
    console.log("🧹 Existing events cleared");

    const result = await Event.insertMany(dummyEvents);
    console.log(`✅ ${result.length} dummy events inserted`);

    await mongoose.connection.close();
    console.log("🔒 Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();

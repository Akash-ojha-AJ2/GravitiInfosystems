// insertDummyEvents.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/EventsModel.js";

dotenv.config();

// MongoDB connection string
const MONGODB_URI = process.env.MONGO_URI;

// CORRECTED: Valid 24-character ObjectId (added '4' at the end)
const CREATOR_ID = "98ae9b9ba99ff8bf1996bab4"; // Now 24 characters

const dummyEvents = [
  {
    title: "Summer Music Festival 2025",
    description: "Experience the biggest music festival of the year with top artists from around the world. Live performances, food trucks, and amazing vibes!",
    category: "Music",
    address: "Central Park, New York, NY 10024",
    geometry: {
      type: "Point",
      coordinates: [-73.9654, 40.7829]
    },
    date: new Date("2025-07-15T16:00:00Z"),
    totalSeats: 5000,
    availableSeats: 3250,
    price: 89.99,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
    eventCreator: CREATOR_ID
  },
  {
    title: "Tech Conference 2025",
    description: "Annual technology conference featuring keynote speakers, workshops, and networking opportunities with industry leaders.",
    category: "Technology",
    address: "Moscone Center, 747 Howard St, San Francisco, CA 94103",
    geometry: {
      type: "Point",
      coordinates: [-122.4005, 37.7840]
    },
    date: new Date("2025-09-20T09:00:00Z"),
    totalSeats: 2000,
    availableSeats: 850,
    price: 299.99,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    eventCreator: CREATOR_ID
  },
  {
    title: "Gourmet Food Festival",
    description: "Taste dishes from 50+ local restaurants and food vendors. Cooking demonstrations by celebrity chefs.",
    category: "Food & Drink",
    address: "Grant Park, 337 E Randolph St, Chicago, IL 60601",
    geometry: {
      type: "Point",
      coordinates: [-87.6198, 41.8768]
    },
    date: new Date("2025-08-10T11:00:00Z"),
    totalSeats: 3000,
    availableSeats: 1200,
    price: 45.00,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    eventCreator: CREATOR_ID
  },
  {
    title: "Marathon for Charity",
    description: "5K and 10K runs to raise funds for local children's hospitals. All fitness levels welcome!",
    category: "Sports",
    address: "Boston Common, 139 Tremont St, Boston, MA 02111",
    geometry: {
      type: "Point",
      coordinates: [-71.0650, 42.3550]
    },
    date: new Date("2025-06-05T07:00:00Z"),
    totalSeats: 4000,
    availableSeats: 2100,
    price: 35.00,
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635",
    eventCreator: CREATOR_ID
  },
  {
    title: "Art & Wine Evening",
    description: "An elegant evening of fine wines and contemporary art exhibitions. Meet local artists and sommeliers.",
    category: "Art",
    address: "Los Angeles County Museum of Art, 5905 Wilshire Blvd, Los Angeles, CA 90036",
    geometry: {
      type: "Point",
      coordinates: [-118.3578, 34.0635]
    },
    date: new Date("2025-07-28T18:30:00Z"),
    totalSeats: 500,
    availableSeats: 280,
    price: 75.00,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    eventCreator: CREATOR_ID
  },
  {
    title: "Yoga in the Park",
    description: "Free community yoga session suitable for all levels. Bring your own mat and water bottle.",
    category: "Wellness",
    address: "Golden Gate Park, San Francisco, CA 94122",
    geometry: {
      type: "Point",
      coordinates: [-122.4912, 37.7699]
    },
    date: new Date("2025-05-18T09:00:00Z"),
    totalSeats: 200,
    availableSeats: 75,
    price: 0,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    eventCreator: CREATOR_ID
  },
  {
    title: "Startup Pitch Night",
    description: "Watch 10 promising startups pitch to top venture capitalists. Networking drinks included.",
    category: "Business",
    address: "WeWork, 81 Prospect St, Brooklyn, NY 11201",
    geometry: {
      type: "Point",
      coordinates: [-73.9918, 40.6913]
    },
    date: new Date("2025-08-22T18:00:00Z"),
    totalSeats: 300,
    availableSeats: 190,
    price: 25.00,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2",
    eventCreator: CREATOR_ID
  },
  {
    title: "Comedy Night Special",
    description: "Featuring 5 top stand-up comedians from Netflix specials. 18+ event.",
    category: "Comedy",
    address: "The Comedy Store, 8433 Sunset Blvd, West Hollywood, CA 90069",
    geometry: {
      type: "Point",
      coordinates: [-118.3734, 34.0940]
    },
    date: new Date("2025-09-12T20:00:00Z"),
    totalSeats: 400,
    availableSeats: 150,
    price: 45.00,
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca",
    eventCreator: CREATOR_ID
  },
  {
    title: "Photography Workshop",
    description: "Learn professional photography techniques from award-winning photographers. Bring your DSLR or mirrorless camera.",
    category: "Workshop",
    address: "School of Visual Arts, 209 E 23rd St, New York, NY 10010",
    geometry: {
      type: "Point",
      coordinates: [-73.9826, 40.7380]
    },
    date: new Date("2025-07-06T10:00:00Z"),
    totalSeats: 50,
    availableSeats: 22,
    price: 150.00,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    eventCreator: CREATOR_ID
  },
  {
    title: "Wine Tasting Tour",
    description: "Guided tour of Napa Valley's finest wineries with exclusive tastings and food pairings.",
    category: "Food & Drink",
    address: "Robert Mondavi Winery, 7801 St Helena Hwy, Oakville, CA 94562",
    geometry: {
      type: "Point",
      coordinates: [-122.4219, 38.4362]
    },
    date: new Date("2025-10-04T12:00:00Z"),
    totalSeats: 100,
    availableSeats: 45,
    price: 125.00,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3",
    eventCreator: CREATOR_ID
  },
  {
    title: "Electronic Music Night",
    description: "All-night electronic music festival with world-renowned DJs and immersive light shows.",
    category: "Music",
    address: "The Warehouse, 2137 N Milwaukee Ave, Chicago, IL 60647",
    geometry: {
      type: "Point",
      coordinates: [-87.6976, 41.9197]
    },
    date: new Date("2025-11-15T22:00:00Z"),
    totalSeats: 1500,
    availableSeats: 600,
    price: 55.00,
    image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d1e",
    eventCreator: CREATOR_ID
  },
  {
    title: "Children's Science Fair",
    description: "Interactive science exhibits and experiments for kids aged 5-12. Fun learning activities!",
    category: "Education",
    address: "Pacific Science Center, 200 2nd Ave N, Seattle, WA 98109",
    geometry: {
      type: "Point",
      coordinates: [-122.3522, 47.6192]
    },
    date: new Date("2025-06-28T10:00:00Z"),
    totalSeats: 800,
    availableSeats: 420,
    price: 12.00,
    image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51",
    eventCreator: CREATOR_ID
  },
  {
    title: "Jazz & Blues Festival",
    description: "Three days of incredible jazz and blues performances across multiple stages in the historic district.",
    category: "Music",
    address: "French Quarter, New Orleans, LA 70116",
    geometry: {
      type: "Point",
      coordinates: [-90.0649, 29.9584]
    },
    date: new Date("2025-10-17T14:00:00Z"),
    totalSeats: 3500,
    availableSeats: 1800,
    price: 79.99,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629",
    eventCreator: CREATOR_ID
  },
  {
    title: "Robotics Competition",
    description: "High school and college teams compete in advanced robotics challenges. Great for tech enthusiasts!",
    category: "Technology",
    address: "Georgia World Congress Center, 285 Andrew Young International Blvd NW, Atlanta, GA 30313",
    geometry: {
      type: "Point",
      coordinates: [-84.3983, 33.7580]
    },
    date: new Date("2025-08-08T09:00:00Z"),
    totalSeats: 1200,
    availableSeats: 550,
    price: 20.00,
    image: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f",
    eventCreator: CREATOR_ID
  },
  {
    title: "Sunset Sailing Cruise",
    description: "2-hour sunset sailing experience with champagne and light appetizers. Perfect for couples!",
    category: "Adventure",
    address: "Miami Marina, 300 Alton Rd, Miami Beach, FL 33139",
    geometry: {
      type: "Point",
      coordinates: [-80.1390, 25.7689]
    },
    date: new Date("2025-07-25T18:30:00Z"),
    totalSeats: 50,
    availableSeats: 18,
    price: 85.00,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    eventCreator: CREATOR_ID
  },
  {
    title: "Vegan Food Expo",
    description: "Discover the latest in plant-based foods, meet producers, and enjoy free samples.",
    category: "Food & Drink",
    address: "Oregon Convention Center, 777 NE Martin Luther King Jr Blvd, Portland, OR 97232",
    geometry: {
      type: "Point",
      coordinates: [-122.6625, 45.5289]
    },
    date: new Date("2025-09-05T10:00:00Z"),
    totalSeats: 2000,
    availableSeats: 1100,
    price: 15.00,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e",
    eventCreator: CREATOR_ID
  },
  {
    title: "Meditation Retreat",
    description: "Weekend mindfulness and meditation retreat in serene natural surroundings.",
    category: "Wellness",
    address: "Sedona Spiritual Center, 25 Canyon Circle Dr, Sedona, AZ 86336",
    geometry: {
      type: "Point",
      coordinates: [-111.7608, 34.8697]
    },
    date: new Date("2025-11-08T09:00:00Z"),
    totalSeats: 80,
    availableSeats: 35,
    price: 199.00,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    eventCreator: CREATOR_ID
  },
  {
    title: "Street Art Festival",
    description: "Live mural painting, graffiti workshops, and urban art exhibitions throughout the neighborhood.",
    category: "Art",
    address: "Wynwood Walls, 2520 NW 2nd Ave, Miami, FL 33127",
    geometry: {
      type: "Point",
      coordinates: [-80.2000, 25.8012]
    },
    date: new Date("2025-12-06T11:00:00Z"),
    totalSeats: 1500,
    availableSeats: 900,
    price: 25.00,
    image: "https://images.unsplash.com/photo-1572371987506-8436b5f416b5",
    eventCreator: CREATOR_ID
  },
  {
    title: "Chess Tournament",
    description: "Open chess tournament for all skill levels. Cash prizes for winners!",
    category: "Sports",
    address: "Saint Louis Chess Club, 4657 Maryland Ave, St Louis, MO 63108",
    geometry: {
      type: "Point",
      coordinates: [-90.2599, 38.6449]
    },
    date: new Date("2025-10-25T09:00:00Z"),
    totalSeats: 200,
    availableSeats: 85,
    price: 40.00,
    image: "https://images.unsplash.com/photo-1529699211954-82abf3aa89c6",
    eventCreator: CREATOR_ID
  },
  {
    title: "New Year's Eve Gala",
    description: "Black-tie New Year's Eve celebration with live orchestra, gourmet dinner, and champagne toast at midnight.",
    category: "Party",
    address: "The Ritz-Carlton, 10 Avery St, Boston, MA 02111",
    geometry: {
      type: "Point",
      coordinates: [-71.0625, 42.3535]
    },
    date: new Date("2025-12-31T20:00:00Z"),
    totalSeats: 600,
    availableSeats: 320,
    price: 299.99,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    eventCreator: CREATOR_ID
  }
];

const insertDummyEvents = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI,{
      dbName:"ticketbookingApp"
    });
    console.log("✅ Connected to MongoDB successfully!");

    // Clear existing events (optional - comment out if you don't want to delete existing data)
    await Event.deleteMany({});
    console.log("🗑️  Cleared existing events");

    // Insert dummy events
    const insertedEvents = await Event.insertMany(dummyEvents);
    console.log(`✅ Successfully inserted ${insertedEvents.length} dummy events!`);
    
    // Count events by creator
    const creatorEvents = await Event.countDocuments({ eventCreator: CREATOR_ID });
    console.log(`📊 Events created by ${CREATOR_ID}: ${creatorEvents}`);
    
    // Log first few events as sample
    console.log("\n📋 Sample of inserted events:");
    insertedEvents.slice(0, 3).forEach((event, index) => {
      console.log(`${index + 1}. ${event.title} - ${event.category} - $${event.price}`);
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  }
};

// Alternative: If you want to keep the original ID format, use this approach
const insertDummyEventsWithNewObjectId = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB successfully!");

    // Generate a new valid ObjectId
    const newCreatorId = new mongoose.Types.ObjectId();
    console.log(`🆔 Generated new Creator ID: ${newCreatorId}`);

    // Update all events with the new ObjectId
    const updatedEvents = dummyEvents.map(event => ({
      ...event,
      eventCreator: newCreatorId
    }));

    await Event.deleteMany({});
    const insertedEvents = await Event.insertMany(updatedEvents);
    
    console.log(`✅ Successfully inserted ${insertedEvents.length} events with new Creator ID!`);
    console.log(`📝 Save this Creator ID for future use: ${newCreatorId}`);

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

// Run the insertion function
// Choose one of these:

// Option 1: Use the corrected 24-character ID
insertDummyEvents();

// Option 2: Generate a new random ObjectId
// insertDummyEventsWithNewObjectId();

export default dummyEvents;
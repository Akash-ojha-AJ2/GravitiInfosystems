import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const categories = [
  "Music",
  "Conference",
  "Art",
  "Wellness",
  "Business",
  "Entertainment",
  "Food",
  "Sports",
];

const Section02 = ({searchQuery, selectedCity }) => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backend = import.meta.env.VITE_BACKEND;

  const default_Image =
    "https://storage.googleapis.com/gweb-cloudblog-publish/images/GOOGLENEXT2024_0410_102815-1522_ALIVECOVER.max-2600x2600.jpg";

  // 🔥 FETCH EVENTS FROM BACKEND
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${backend}/api/events`);

        if (res.data?.events?.length > 0) {
          setEvents(res.data.events);
        } else {
          setEvents([]);
        }

      } catch (err) {
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 🔥 FILTER LOGIC (Category + City)
const filteredEvents = events.filter((event) => {

  const categoryMatch =
    activeCategory === "All" || event.category === activeCategory;

  const cityMatch =
    selectedCity === "All Locations" ||
    event.address?.toLowerCase().includes(selectedCity?.toLowerCase());

  const searchMatch =
    event.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    event.address?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    event.category?.toLowerCase().includes(searchQuery?.toLowerCase());

  return categoryMatch && cityMatch && searchMatch;
});

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // 🔄 LOADING STATE
  // =========================
  if (loading) {
    return (
      <section className="py-5 text-center">
        <div className="container">
          <h5 className="text-muted">Loading events...</h5>
        </div>
      </section>
    );
  }

  // =========================
  // ❌ ERROR STATE
  // =========================
  if (error) {
    return (
      <section className="py-5 text-center">
        <div className="container">
          <h5 className="text-danger">{error}</h5>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">

        {/* ===== Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="fw-bold mb-3">
            Featured Events
            <span
              className="d-block mt-2 bg-primary rounded"
              style={{ width: 60, height: 4 }}
            />
          </h2>

          {/* Categories */}
          <div className="d-flex flex-wrap gap-2 mt-4">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn rounded-pill px-4 ${
                  activeCategory === cat
                    ? "btn-primary"
                    : "btn-outline-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ========================= */}
        {/* 🚫 NO EVENTS IN DATABASE */}
        {/* ========================= */}
        {events.length === 0 ? (
          <div className="text-center py-5">
            <h5 className="text-muted">
              No events available right now.
            </h5>
          </div>
        ) : filteredEvents.length === 0 ? (

          /* ========================= */
          /* 🚫 NO FILTER RESULTS */
          /* ========================= */
          <div className="text-center py-5">
            <h5 className="text-muted">
              No events found for "{selectedCity}" in "{activeCategory}" category.
            </h5>
          </div>

        ) : (

          /* ========================= */
          /* ✅ EVENTS CARDS */
          /* ========================= */
          <div className="row g-4">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event._id}
                className="col-12 col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                <div
                  className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                  onClick={() => navigate(`/events/${event._id}`)}
                  style={{ cursor: "pointer" }}
                >

                  {/* Image */}
                  <div className="position-relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="card-img-top"
                      style={{ height: 220, objectFit: "cover" }}
                    />

                    <span className="badge bg-primary position-absolute top-0 start-0 m-3 px-3 py-2">
                      {event.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold">{event.title}</h5>

                    <div className="text-muted small d-flex flex-wrap gap-3 my-2">
                      <span>
                        <FaMapMarkerAlt className="me-1" />
                        {event.address}
                      </span>
                      <span>
                        <FaCalendarAlt className="me-1" />
                        {formatDate(event.date)}
                      </span>
                    </div>

                    <p>
                      Seats available:{" "}
                      <strong>{event.availableSeats}</strong>
                    </p>

                    <button className="btn btn-primary mt-auto">
                      Book Now ₹{event.price}
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        )}

      </div>
    </section>
  );
};

export default Section02;

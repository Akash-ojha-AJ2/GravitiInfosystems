import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapView from "../components/other/MapView.jsx";
import { Calendar, Clock, MapPin, DollarSign, Users, Tag, Share2, Bookmark, Navigation } from "lucide-react";
import BookingModal from "../components/other/BookingModal.jsx";
import { io } from "socket.io-client";

const EventDetail = () => {
  const backend = import.meta.env.VITE_BACKEND
  const socket = io(`${backend}`);
  const [showBooking, setShowBooking] = useState(false);
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    socket.on("seatUpdated", (data) => {
      if (data.eventId === event._id) {
        setEvent((prev) => ({
          ...prev,
          availableSeats: data.availableSeats,
        }));
      }
    });

    return () => socket.off("seatUpdated");
  }, [event]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backend}/api/events/${id}`);
        setEvent(res.data.event);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="text-center">
          <h2 className="h3 text-muted mb-3">Event Not Found</h2>
          <p className="text-secondary">The event you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const seatsPercentage = Math.round((event.availableSeats / event.totalSeats) * 100);

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
          <li className="breadcrumb-item"><a href="/events" className="text-decoration-none">Events</a></li>
          <li className="breadcrumb-item active text-primary" aria-current="page">{event.title}</li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 mb-4">
            <img
              src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"}
              className="card-img-top rounded-top"
              alt={event.title}
              style={{ height: "350px", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800";
              }}
            />
          </div>
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h1 className="card-title h2 fw-bold mb-4">{event.title}</h1>

              <div className="row g-3 mb-4">
                <div className="col-12">
                  <div className="d-flex align-items-center mb-2">
                    <Tag className="me-2 text-primary" size={20} />
                    <span className="fw-semibold me-2">Category:</span>
                    <span className="badge bg-primary">{event.category}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <Calendar className="me-2 text-success" size={20} />
                    <div>
                      <div className="fw-semibold">Date</div>
                      <div className="text-muted">{formattedDate}</div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <Clock className="me-2 text-warning" size={20} />
                    <div>
                      <div className="fw-semibold">Time</div>
                      <div className="text-muted">{formattedTime}</div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex align-items-center mb-3">
                    <MapPin className="me-2 text-danger" size={20} />
                    <div>
                      <div className="fw-semibold">Location</div>
                      <div className="text-muted">{event.address}</div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <DollarSign className="me-2 text-success" size={20} />
                    <div>
                      <div className="fw-semibold">Price</div>
                      <div className="h5 text-success mb-0">₹{event.price}</div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <Users className="me-2 text-info" size={20} />
                    <div>
                      <div className="fw-semibold">Available Seats</div>
                      <div className="h5 mb-0">{event.availableSeats} / {event.totalSeats}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-semibold">Seat Availability</span>
                  <span className="text-muted">{seatsPercentage}% available</span>
                </div>
                <div className="progress" style={{ height: "10px" }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${seatsPercentage}%` }}
                    aria-valuenow={seatsPercentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="d-grid gap-2 d-md-flex">
                {localStorage.getItem("token") && (
  <button
    className="btn btn-primary btn-lg flex-grow-1 me-md-2"
    onClick={() => setShowBooking(true)}
  >
    <Bookmark className="me-2" size={20} />
    Book Now - ₹{event.price}
  </button>
)}

                <button className="btn btn-outline-primary btn-lg">
                  <Share2 className="me-2" size={20} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h3 className="card-title h4 fw-bold mb-3">
                <Navigation className="me-2 text-primary" size={20} />
                Event Description
              </h3>
              <p className="card-text text-muted" style={{ lineHeight: "1.8" }}>
                {event.description}
              </p>
            </div>
          </div>
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white border-0">
              <h3 className="card-title h5 fw-bold mb-0">
                <MapPin className="me-2 text-danger" size={20} />
                Event Location
              </h3>
            </div>
            <div className="card-body p-0">
              <div style={{ height: "350px" }}>
                <MapView coordinates={event?.geometry?.coordinates} />

              </div>
            </div>
            <div className="card-footer bg-light">
              <small className="text-muted">
                <strong>Exact location:</strong> {event.address}
              </small>
            </div>
          </div>
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="card-title h5 fw-bold mb-4">Event Stats</h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="card bg-light border-0">
                    <div className="card-body text-center">
                      <div className="text-muted mb-1">Total Capacity</div>
                      <div className="h3 fw-bold">{event.totalSeats}</div>
                      <small className="text-muted">seats</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-light border-0">
                    <div className="card-body text-center">
                      <div className="text-muted mb-1">Remaining Seats</div>
                      <div className="h3 fw-bold text-success">{event.availableSeats}</div>
                      <small className="text-muted">seats</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-light border-0">
                    <div className="card-body text-center">
                      <div className="text-muted mb-1">Ticket Price</div>
                      <div className="h3 fw-bold text-primary">₹{event.price}</div>
                      <small className="text-muted">per person</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-light border-0">
                    <div className="card-body text-center">
                      <div className="text-muted mb-1">Category</div>
                      <div className="h5 fw-bold">{event.category}</div>
                      <small className="text-muted">event type</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-6 mb-3 mb-md-0">
                  <h5 className="card-title mb-3">Share this event</h5>
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-primary">
                      <i className="bi bi-facebook me-2"></i>
                      Facebook
                    </button>
                    <button type="button" className="btn btn-outline-info">
                      <i className="bi bi-twitter me-2"></i>
                      Twitter
                    </button>
                    <button type="button" className="btn btn-outline-success">
                      <i className="bi bi-whatsapp me-2"></i>
                      WhatsApp
                    </button>
                  </div>
                </div>
                <div className="col-md-6 text-md-end">
                  <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2">
                    <button className="btn btn-outline-secondary">
                      <i className="bi bi-calendar-plus me-2"></i>
                      Add to Calendar
                    </button>
                    {localStorage.getItem("token") && (
  <button
    className="btn btn-primary"
    onClick={() => setShowBooking(true)}
  >
    Get Tickets
  </button>
)}

                    <BookingModal
                      show={showBooking}
                      onClose={() => setShowBooking(false)}
                      event={event}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
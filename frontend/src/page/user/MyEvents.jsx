import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyEvents = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/user/booking/my-booking",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(res.data.bookings);
      } catch (error) {
        console.error("Error fetching my events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center mt-5">
        <h4>No events booked yet</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Browse Events
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">My Events</h2>

      <div className="row g-4">
        {bookings.map((booking) => {
          const event = booking.event_id;

          return (
            <div className="col-md-6 col-lg-4" key={booking._id}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="card-img-top"
                  style={{ height: 200, objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="fw-bold">{event.title}</h5>
                  <p className="text-muted mb-1">{event.address}</p>
                  <p className="mb-1">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toDateString()}
                  </p>
                  <p className="mb-1">
                    <strong>Tickets:</strong> {booking.quantity}
                  </p>
                  <p className="mb-2">
                    <strong>Total:</strong> ₹{booking.totalAmount}
                  </p>

                  <span className="badge bg-success">
                    {booking.status}
                  </span>
                </div>

                <div className="card-footer bg-white">
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    View Event
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyEvents;

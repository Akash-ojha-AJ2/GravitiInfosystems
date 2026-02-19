import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllEvent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_BACKEND

  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    const res = await axios.get(
      `${backend}/api/AdminEvent/admin/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setEvents(res.data.events);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    await axios.delete(
      `${backend}/api/events/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchEvents();
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">All Events (Admin)</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-event")}
        >
          + Add Event
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{event.category}</td>
                <td>{new Date(event.date).toDateString()}</td>
                <td>
                  <span
                    className={
                      event.availableSeats === 0
                        ? "fw-bold text-danger"
                        : "fw-semibold text-success"
                    }
                  >
                    {event.availableSeats}
                  </span>
                  {" / "}
                  <span className="text-muted">{event.totalSeats}</span>
                </td>
                <td>₹{event.price}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => navigate(`/edit-event/${event._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEvent;

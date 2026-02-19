import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const backend = import.meta.env.VITE_BACKEND

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${backend}/api/AdminBooking/admin/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(res.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: "bg-success text-white",
      cancelled: "bg-danger text-white",
      pending: "bg-warning text-dark"
    };
    
    return (
      <span className={`badge ${badges[status] || "bg-secondary"} py-2 px-3`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    pending: bookings.filter(b => b.status === "pending").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
    revenue: bookings
      .filter(b => b.status === "confirmed")
      .reduce((acc, curr) => acc + curr.totalAmount, 0)
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Fetching bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleUpdate = async (id, status) => {
    try {
      await axios.put(
        `${backend}/api/AdminBooking/admin/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status } : b
        )
      );

    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container py-4">
        {/* Header Section with Gradient */}
        <div className="card border-0 bg-gradient-primary text-white mb-4 shadow-lg">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="display-6 fw-bold mb-2">
                  <i className="bi bi-calendar-check me-2"></i>
                  Booking Management
                </h1>
                <p className="mb-0 opacity-75">
                  Manage and monitor all user bookings in one place
                </p>
              </div>
              <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
                <span className="badge bg-white text-primary p-3 rounded-pill">
                  <i className="bi bi-people me-2"></i>
                  Total Bookings: {bookings.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-xl-3 col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                      <i className="bi bi-ticket-perforated fs-4 text-primary"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Total Bookings</h6>
                    <h3 className="mb-0 fw-bold">{stats.total}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-3 col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-success bg-opacity-10 p-3 rounded">
                      <i className="bi bi-check-circle fs-4 text-success"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Confirmed</h6>
                    <h3 className="mb-0 fw-bold">{stats.confirmed}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-3 col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-warning bg-opacity-10 p-3 rounded">
                      <i className="bi bi-clock-history fs-4 text-warning"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Pending</h6>
                    <h3 className="mb-0 fw-bold">{stats.pending}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-3 col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-info bg-opacity-10 p-3 rounded">
                      <i className="bi bi-currency-rupee fs-4 text-info"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Total Revenue</h6>
                    <h3 className="mb-0 fw-bold">₹{stats.revenue.toLocaleString()}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex flex-wrap align-items-center gap-3">
              <h6 className="fw-bold mb-0 me-2">
                <i className="bi bi-funnel me-1"></i>
                Filter by Status:
              </h6>
              <div className="btn-group">
                <button 
                  className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`btn btn-sm ${filter === 'confirmed' ? 'btn-success' : 'btn-outline-secondary'}`}
                  onClick={() => setFilter('confirmed')}
                >
                  Confirmed
                </button>
                <button 
                  className={`btn btn-sm ${filter === 'pending' ? 'btn-warning' : 'btn-outline-secondary'}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </button>
                <button 
                  className={`btn btn-sm ${filter === 'cancelled' ? 'btn-danger' : 'btn-outline-secondary'}`}
                  onClick={() => setFilter('cancelled')}
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table Card */}
        <div className="card border-0 shadow">
          <div className="card-header bg-white py-3">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="fw-bold mb-0">
                  <i className="bi bi-table me-2"></i>
                  Booking Details
                  <span className="badge bg-secondary ms-2">{filteredBookings.length}</span>
                </h5>
              </div>
              <div className="col-auto">
                <button className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-download me-1"></i>
                  Export
                </button>
              </div>
            </div>
          </div>
          
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">Mobile</th>
                    <th className="py-3">Event</th>
                    <th className="py-3 text-center">Qty</th>
                    <th className="py-3">Total</th>
                    <th className="py-3">Status</th>
                    <th className="py-3 text-center">Actions</th>
                    <th className="py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((b) => (
                      <tr key={b._id} className="border-bottom">
                        <td className="px-4">
                          <div className="d-flex align-items-center">
                            <div className="bg-light rounded-circle p-2 me-2">
                              <i className="bi bi-person-circle text-primary"></i>
                            </div>
                            <div>
                              <div className="fw-semibold">{b.user_id?.name || b.name || 'N/A'}</div>
                              <small className="text-muted">ID: {b.user_id?._id?.slice(-6) || b._id?.slice(-6) || 'N/A'}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-muted">{b.user_id?.email || b.email || 'N/A'}</span>
                        </td>
                        <td>
                          <span className="text-muted">{b.user_id?.mobile || b.mobile || 'N/A'}</span>
                        </td>
                        <td>
                          <div className="fw-semibold">{b.event_id?.title || 'N/A'}</div>
                          <small className="text-muted">{b.event_id?.category || 'Event'}</small>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-light text-dark px-3 py-2">
                            {b.quantity}
                          </span>
                        </td>
                        <td>
                          <span className="fw-bold">₹{b.totalAmount?.toLocaleString()}</span>
                        </td>
                        <td>
                          {getStatusBadge(b.status)}
                        </td>
                        <td className="text-center">
                          <div className="d-flex gap-2 justify-content-center">
                            <button
                              className="btn btn-sm btn-info text-white"
                              onClick={() => handleViewDetails(b)}
                              title="View Details"
                            >
                              <i className="bi bi-eye me-1"></i>
                              View
                            </button>
                            {b.status === "pending" && (
                              <>
                                <button
                                  className="btn btn-sm btn-success"
                                  onClick={() => handleUpdate(b._id, "confirmed")}
                                  title="Confirm Booking"
                                >
                                  <i className="bi bi-check-lg"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleUpdate(b._id, "cancelled")}
                                  title="Cancel Booking"
                                >
                                  <i className="bi bi-x-lg"></i>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="fw-semibold">
                              {new Date(b.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                            <small className="text-muted">
                              {new Date(b.createdAt).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </small>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-5">
                        <div className="my-4">
                          <i className="bi bi-inbox fs-1 text-muted"></i>
                          <h6 className="mt-3 text-muted">No bookings found</h6>
                          <p className="text-muted mb-0">There are no bookings matching your criteria.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Table Footer */}
          <div className="card-footer bg-white py-3">
            <div className="row align-items-center">
              <div className="col text-muted">
                <small>
                  <i className="bi bi-info-circle me-1"></i>
                  Showing {filteredBookings.length} of {bookings.length} bookings
                </small>
              </div>
              <div className="col-auto">
                <small className="text-muted">
                  Last updated: {new Date().toLocaleTimeString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal}
        size="lg"
        centered
        className="user-details-modal"
      >
        <Modal.Header closeButton className="bg-gradient-primary text-white border-0">
          <Modal.Title className="fw-bold">
            <i className="bi bi-person-badge me-2"></i>
            Booking Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedBooking && (
            <div className="row">
              {/* User Information Section */}
              <div className="col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-header bg-light border-0 py-3">
                    <h6 className="fw-bold mb-0">
                      <i className="bi bi-person-circle me-2 text-primary"></i>
                      User Information
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-4">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="bi bi-person fs-2 text-primary"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">{selectedBooking.user_id?.name || selectedBooking.name}</h5>
                        <span className="badge bg-light text-dark">
                          ID: {selectedBooking.user_id?._id || selectedBooking._id}
                        </span>
                      </div>
                    </div>
                    
                    <div className="list-group list-group-flush">
                      <div className="list-group-item px-0 d-flex align-items-center">
                        <i className="bi bi-envelope text-primary me-3"></i>
                        <div>
                          <small className="text-muted d-block">Email Address</small>
                          <span className="fw-semibold">{selectedBooking.user_id?.email || selectedBooking.email}</span>
                        </div>
                      </div>
                      
                      <div className="list-group-item px-0 d-flex align-items-center">
                        <i className="bi bi-phone text-primary me-3"></i>
                        <div>
                          <small className="text-muted d-block">Mobile Number</small>
                          <span className="fw-semibold">{selectedBooking.user_id?.mobile || selectedBooking.mobile}</span>
                        </div>
                      </div>
                      
                      <div className="list-group-item px-0 d-flex align-items-center">
                        <i className="bi bi-ticket text-primary me-3"></i>
                        <div>
                          <small className="text-muted d-block">Booking ID</small>
                          <span className="fw-semibold">{selectedBooking._id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Information Section */}
              <div className="col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-header bg-light border-0 py-3">
                    <h6 className="fw-bold mb-0">
                      <i className="bi bi-calendar-event me-2 text-success"></i>
                      Event Information
                    </h6>
                  </div>
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">{selectedBooking.event_id?.title}</h5>
                    
                    <div className="list-group list-group-flush">
                      <div className="list-group-item px-0 d-flex align-items-center">
                        <i className="bi bi-tag text-success me-3"></i>
                        <div>
                          <small className="text-muted d-block">Category</small>
                          <span className="fw-semibold">{selectedBooking.event_id?.category || 'Event'}</span>
                        </div>
                      </div>
                      
                      <div className="list-group-item px-0 d-flex align-items-center">
                        <i className="bi bi-123 text-success me-3"></i>
                        <div>
                          <small className="text-muted d-block">Quantity</small>
                          <span className="fw-semibold">{selectedBooking.quantity} Tickets</span>
                        </div>
                      </div>
                      
                      <div className="list-group-item px-0 d-flex align-items-center">
                        <i className="bi bi-currency-rupee text-success me-3"></i>
                        <div>
                          <small className="text-muted d-block">Total Amount</small>
                          <span className="fw-bold fs-5 text-success">₹{selectedBooking.totalAmount?.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="list-group-item px-0 d-flex align-items-center">
                        <i className="bi bi-calendar text-success me-3"></i>
                        <div>
                          <small className="text-muted d-block">Booking Date</small>
                          <span className="fw-semibold">
                            {new Date(selectedBooking.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Screenshot Section */}
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-light border-0 py-3">
                    <h6 className="fw-bold mb-0">
                      <i className="bi bi-image me-2 text-warning"></i>
                      Payment Screenshot
                    </h6>
                  </div>
                  <div className="card-body text-center">
                    {selectedBooking.paymentScreenshot ? (
                      <div className="payment-screenshot-container">
                        <a 
                          href={selectedBooking.paymentScreenshot} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="d-block"
                        >
                          <img 
                            src={selectedBooking.paymentScreenshot} 
                            alt="Payment Screenshot"
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: '400px', cursor: 'pointer' }}
                          />
                        </a>
                        <div className="mt-3">
                          <span className="badge bg-light text-dark py-2 px-3">
                            <i className="bi bi-download me-1"></i>
                            Click image to view full size
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="py-4">
                        <i className="bi bi-image-slash fs-1 text-muted"></i>
                        <p className="text-muted mt-2 mb-0">No payment screenshot available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="col-12 mt-4">
                <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                  <div>
                    <span className="text-muted me-2">Booking Status:</span>
                    {getStatusBadge(selectedBooking.status)}
                  </div>
                  <div>
                    <span className="text-muted me-2">Payment Status:</span>
                    <span className={`badge ${selectedBooking.status === 'confirmed' ? 'bg-success' : selectedBooking.status === 'cancelled' ? 'bg-danger' : 'bg-warning'} py-2 px-3`}>
                      {selectedBooking.status === 'confirmed' ? 'Paid' : selectedBooking.status === 'cancelled' ? 'Refunded' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 bg-light">
          <Button variant="secondary" onClick={handleCloseModal}>
            <i className="bi bi-x-lg me-1"></i>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .table > :not(caption) > * > * {
          padding: 1rem 0.75rem;
        }
        
        .btn-group .btn {
          padding: 0.4rem 1rem;
          font-size: 0.875rem;
        }
        
        .card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .card:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08) !important;
        }
        
        .bg-opacity-10 {
          --bs-bg-opacity: 0.1;
        }

        .user-details-modal .modal-content {
          border: none;
          border-radius: 1rem;
        }

        .user-details-modal .modal-header {
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
        }

        .payment-screenshot-container {
          transition: transform 0.3s ease;
        }

        .payment-screenshot-container:hover {
          transform: scale(1.01);
        }

        .list-group-item {
          border: none;
          background: transparent;
        }

        .btn-info {
          background-color: #17a2b8;
          border-color: #17a2b8;
        }

        .btn-info:hover {
          background-color: #138496;
          border-color: #117a8b;
        }
      `}</style>
    </div>
  );
};

export default AdminBookings;
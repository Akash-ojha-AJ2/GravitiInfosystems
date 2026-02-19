import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const BookingModal = ({ show, onClose, event }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const backend = import.meta.env.VITE_BACKEND

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!screenshot) {
      setError("Please upload payment screenshot");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("event_id", event._id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("quantity", quantity);
      formData.append("paymentScreenshot", screenshot);

      await axios.post(
        `${backend}/api/user/booking/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose();
      alert("Booking submitted! Waiting for admin confirmation.");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="auth-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="auth-modal"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <h4 className="fw-bold mb-3">Complete Payment</h4>

          {error && <p className="text-danger">{error}</p>}

          {/* 🔥 Dummy Bank Details */}
          <div className="alert alert-info small">
            <strong>Bank Details (Demo)</strong><br />
            Account Holder: Event Booking Pvt Ltd <br />
            Account Number: 123456789012 <br />
            IFSC Code: SBIN0001234
          </div>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />

            <input
              className="form-control mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />

            <input
              className="form-control mb-2"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
              required
            />

            <input
              type="number"
              className="form-control mb-2"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            {/* 🔥 Screenshot Upload */}
            <label className="form-label fw-semibold mt-2">
              Upload Payment Screenshot
            </label>
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
              required
            />

            <button className="btn btn-primary w-100" disabled={loading}>
              {loading
                ? "Submitting..."
                : `Pay ₹${quantity * event.price}`}
            </button>
          </form>

          <button className="btn-close auth-close" onClick={onClose}></button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;






import { useState, useEffect } from "react";
import { FaTicketAlt, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import AuthModal from "../components/auth/AuthModal.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // 🔥 user / admin

  // 🔥 Check token & role on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setLoggedIn(true);
      setRole(user.role);
    } else {
      setLoggedIn(false);
      setRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setRole(null);
    navigate("/");
  };

  return (
    <>
      <motion.header
        className="navbar navbar-expand-lg fixed-top bg-white shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="navbar-brand fw-bold d-flex align-items-center">
            <FaTicketAlt size={32} className="me-2 text-primary" />
            <span style={{ fontSize: "1.6rem" }}>
              Event<span className="text-primary">Hub</span>
            </span>
          </div>
          <button
            className="navbar-toggler"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

              {!loggedIn && (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setAuthMode("login");
                        setShowAuth(true);
                      }}
                    >
                      Login
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setAuthMode("signup");
                        setShowAuth(true);
                      }}
                    >
                      Sign Up
                    </button>
                  </li>
                </>
              )}

              {loggedIn && role === "user" && (
                <>
                  <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                  <li className="nav-item"><a className="nav-link" href="/my-events">My Events</a></li>

                  <li className="nav-item">
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}

              {loggedIn && role === "admin" && (
                <>
                  <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                  <li className="nav-item"><a className="nav-link" href="/all-events">All Events</a></li>
                  <li className="nav-item"><a className="nav-link" href="/add-event">Add Event</a></li>
                  <li className="nav-item"><a className="nav-link" href="/Admin-All-Booking">Bookings</a></li>

                  <li className="nav-item">
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </motion.header>

      <AuthModal
        show={showAuth}
        mode={authMode}
        onClose={() => setShowAuth(false)}
        onSuccess={() => {
          const user = JSON.parse(localStorage.getItem("user"));
          setLoggedIn(true);
          setRole(user.role);
        }}
      />
    </>
  );
};

export default Navbar;

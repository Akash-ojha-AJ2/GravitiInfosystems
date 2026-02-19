import { Routes, Route,Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./lauout/Navbar.jsx";
import Footer from "./lauout/Footer.jsx";
import Home from "./page/Home.jsx";
import EventDetail from "./page/EventDetail.jsx";
import MyEvents from "./page/user/MyEvents.jsx";
import AddEvent from "./page/admin/AddEvent.jsx";
import EditEvent from "./page/admin/EditEvent.jsx";
import AllEvent from "./page/admin/AllEvent.jsx";
import AdminBookings from "./page/admin/AdminBookings.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

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

  return (
    <div className="app-container">
      <Navbar loggedIn={loggedIn} role={role} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<EventDetail />} />

          {loggedIn && role === "user" && (
            <>
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="*" element={<Home />} />
            </>
            
          )}
          
          {loggedIn && role === "admin" && (
            <>
              <Route path="/all-events" element={<AllEvent />} />
              <Route path="/add-event" element={<AddEvent />} />
              <Route path="/edit-event/:id" element={<EditEvent />} />
              <Route path="/Admin-All-Booking" element={<AdminBookings />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;

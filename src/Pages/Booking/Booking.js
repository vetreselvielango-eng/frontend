import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const location = useLocation();

  // Try to read service name from navigation state or query param
  const serviceFromState = location.state?.serviceName || "";
  const serviceFromQuery =
    new URLSearchParams(location.search).get("service") || "";
  const prefillService = serviceFromState || serviceFromQuery;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: prefillService, // ✅ auto-filled if available
    date: "",
    days: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitBooking = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Booking failed");
        return;
      }

      alert("✅ Service booked successfully");

      setFormData({
        name: "",
        email: "",
        service: prefillService, // keep the service name if it came from Services page
        date: "",
        days: "",
        message: "",
      });
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Server error while booking");
    }
  };

  return (
    <div className="booking-container">
      <h2>Service Booking</h2>

      <form onSubmit={submitBooking} className="booking-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="service"
          placeholder="Service Name"
          value={formData.service}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="days"
          placeholder="Number of Days"
          value={formData.days}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Additional Message (optional)"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default Booking;

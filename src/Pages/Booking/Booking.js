import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const location = useLocation();

  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Auto-fill service name
  useEffect(() => {
    if (location.state?.selectedService) {
      setService(location.state.selectedService);
    }
  }, [location.state]);

  const submitBooking = async () => {
    if (!service || !date || !days) {
      alert("All fields required");
      return;
    }
  
    const token = localStorage.getItem("token");
  
    try {
      setLoading(true);
  
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ service, date, days }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message || "Booking failed");
        return;
      }
  
      alert("✅ Booking Successful");
      setService("");
      setDate("");
      setDays("");
    } catch (error) {
      alert("Server connection failed");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="booking-container">
      <h2>Book a Service</h2>

      <input
        type="text"
        placeholder="Service Name"
        value={service}
        readOnly
      />

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <input
        type="number"
        placeholder="Number of days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />

      <button onClick={submitBooking} disabled={loading}>
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
}

export default Booking;

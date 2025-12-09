import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const location = useLocation(); //Getting Data From Previous Page (Router). Receives data that was sent using navigate("/booking", { state: {...} }) in services page.

  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [days, setDays] = useState("");
  const [endDate, setEndDate] = useState(""); // NEW: Auto-calculated end date
  const [loading, setLoading] = useState(false);

  // Auto-fill service name
  useEffect(() => {
    if (location.state?.selectedService) {
      setService(location.state.selectedService); //this value came from another file/page (probably Services page)
    }
  }, [location.state]);

  // GET TOMORROW'S DATE (for disabling today & past dates)
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  // AUTO CALCULATE END DATE WHEN DATE OR DAYS CHANGE
  useEffect(() => {
    if (date && days) {
      const start = new Date(date);
      const totalDays = parseInt(days, 10);

      if (totalDays >= 1 && totalDays <= 30) {
        const end = new Date(start);
        end.setDate(start.getDate() + totalDays);
        setEndDate(end.toISOString().split("T")[0]);
      } else {
        setEndDate("");
      }
    } else {
      setEndDate("");
    }
  }, [date, days]);

  const submitBooking = async () => {
    // ✅ Extra logical validation
    if (!service || !date || !days) {
      alert("All fields required");
      return;
    }

    if (days < 1 || days > 30) {
      alert("Number of days must be between 1 and 30");
      return;
    }

    const token = localStorage.getItem("token"); //Getting token from localStorage (set during login). The JWT token was saved during login. This is used for user authentication.

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ service, date, days }),
        }
      );

      const data = await res.json();

      if (!res.ok) {                              //If response is not ok (status code outside 200-299)
        alert(data.message || "Booking failed");
        return;
      }

      alert("✅ Booking Successful");
      setService("");
      setDate("");
      setDays("");
      setEndDate("");
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

      {/* ✅ TODAY & PAST DATES DISABLED */}
      <input
        type="date"
        value={date}
        min={getTomorrowDate()}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* ✅ DAYS: MIN 1, MAX 30 */}
      <input
        type="number"
        placeholder="Number of days"
        value={days}
        min="1"
        max="30"                 // ✅ MAX 30 DAYS
        onChange={(e) => setDays(e.target.value)}
      />

      {/* ✅ AUTO CALCULATED END DATE (READ ONLY) */}
      {endDate && (
        <p style={{ textAlign: "center", fontWeight: "600" }}>
          End Date: {new Date(endDate).toLocaleDateString()}
        </p>
      )}

      <button onClick={submitBooking} disabled={loading}>
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
}

export default Booking;

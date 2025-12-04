import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to view dashboard");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "x-access-token": token,
      };

      // ✅ USER-ONLY ORDERS
      const orderRes = await axios.get(
        `${API_BASE_URL}/api/orders/my-orders`,
        { headers }
      );

      // ✅ USER-ONLY BOOKINGS
      const bookingRes = await axios.get(
        `${API_BASE_URL}/api/bookings/my-bookings`,
        { headers }
      );

      setOrders(orderRes.data || []);
      setBookings(bookingRes.data || []);
    } catch (error) {
      console.error("❌ Dashboard fetch error:", error);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading dashboard...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>My Dashboard</h1>

      {/* ✅ ORDERS SECTION */}
      <section className="dashboard-section">
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>${order.totalAmount}</td>
                  <td>{order.paymentStatus}</td>
                  <td>{order.status}</td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* ✅ BOOKINGS SECTION */}
      <section className="dashboard-section">
        <h2>My Bookings</h2>

        {bookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Date</th>
                <th>Days</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.service}</td>
                  <td>
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td>{booking.days}</td>
                  <td>{booking.status || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default Dashboard;

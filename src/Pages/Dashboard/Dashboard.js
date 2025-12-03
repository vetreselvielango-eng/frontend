import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // ✅ My Orders (Product Orders Only)
  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (token) {
      fetchMyOrders();
    } else {
      setLoadingOrders(false);
    }
  }, [token]);

  // ✅ My Bookings (Show all for now – no filter)
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings");
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch bookings error:", error);
        setBookings([]);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="dashboard-card">
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
      </div>

      {/* ✅ MY ORDERS */}
      <h3 style={{ marginTop: "20px" }}>My Orders</h3>

      {loadingOrders ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>
                <td>
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td>${order.totalAmount}</td>
                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ MY BOOKINGS */}
      <h3 style={{ marginTop: "40px" }}>My Bookings</h3>

      {loadingBookings ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Service</th>
              <th>Date</th>
              <th>Days</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((book, i) => (
              <tr key={book._id}>
                <td>{i + 1}</td>
                <td>{book.name}</td>
                <td>{book.email}</td>
                <td>{book.service}</td>
                <td>{book.date}</td>
                <td>{book.days}</td>
                <td>{book.message || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;

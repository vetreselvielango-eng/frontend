import React, { useEffect, useState } from "react";
// import "./AdminDashboard.css";

function AdminDashboard() {
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // ✅ Fetch ALL orders (admin)
    fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []));

    // ✅ Fetch ALL bookings (admin)
    fetch("http://localhost:5000/api/bookings/admin/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []));
  }, [token]);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      {/* ✅ ALL ORDERS */}
      <h3>All Orders</h3>
      <table className="orders-table">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
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
                {order.userId?.name} <br />
                {order.userId?.email}
              </td>
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

      {/* ✅ ALL BOOKINGS */}
      <h3 style={{ marginTop: "40px" }}>All Bookings</h3>
      <table className="orders-table">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Service</th>
            <th>Date</th>
            <th>Days</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((book, i) => (
            <tr key={book._id}>
              <td>{i + 1}</td>
              <td>
                {book.user?.name} <br />
                {book.user?.email}
              </td>
              <td>{book.service}</td>
              <td>{book.date}</td>
              <td>{book.days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;

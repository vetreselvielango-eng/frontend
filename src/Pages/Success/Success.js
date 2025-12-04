import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import "./Success.css";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function Success() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setStatus("error");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_BASE_URL}/api/checkout/verify-session`,
          {
            params: { session_id: sessionId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data?.paid) {
          setOrder(response.data.order);
          setStatus("success");
          localStorage.removeItem("cart"); // clear cart after success
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Verify payment error:", error);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (status === "loading") {
    return <div className="success-page">Verifying payment...</div>;
  }

  if (status === "error") {
    return (
      <div className="success-page">
        <h2>Payment could not be verified</h2>
        <Link to="/cart">Back to Cart</Link>
      </div>
    );
  }

  return (
    <div className="success-page">
      <h2>Payment Successful 🎉</h2>
      <p>Your order has been placed.</p>

      {order && (
        <div className="order-summary">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total:</strong> ${order.totalAmount}</p>
          <p><strong>Status:</strong> {order.paymentStatus}</p>
        </div>
      )}

      <Link to="/products" className="back-link">
        Continue Shopping
      </Link>
    </div>
  );
}

export default Success;

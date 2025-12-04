import React from "react";
import { Link } from "react-router-dom";
import "./Cancel.css";

function Cancel() {
  return (
    <div className="cancel-page">
      <h2>Payment Cancelled</h2>
      <p>Your payment was cancelled. You can try again anytime.</p>
      <Link to="/cart" className="back-link">
        Back to Cart
      </Link>
    </div>
  );
}

export default Cancel;

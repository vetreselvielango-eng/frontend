// frontend/src/Components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* COMPANY INFO */}
        <div className="footer-section">
          <h2>VR Experience</h2>
          <p>
            We provide futuristic VR rentals, event packages, and custom virtual
            reality solutions for all business and entertainment needs.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/services">Services</Link>
          <Link to="/booking">Booking</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* SERVICES */}
        <div className="footer-section">
          <h3>Our Services</h3>
          <p>VR Headset Rentals</p>
          <p>Corporate VR Events</p>
          <p>VR Gaming Zones</p>
          <p>Product Launch VR Demos</p>
        </div>

        {/* CONTACT */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@vrexperience.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Location: Minneapolis, USA</p>

          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} VR Experience. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;

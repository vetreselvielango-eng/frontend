import React from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";

function Services() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      type: "Corporate Events",
      price: 5000,
      features: ["Team VR Games", "Product Demos", "Live Setup"],
    },
    {
      id: 2,
      type: "Gaming Zone Setup",
      price: 3000,
      features: ["Multiplayer VR", "High-End PCs", "VR Tournaments"],
    },
    {
      id: 3,
      type: "Wedding VR Booth",
      price: 4000,
      features: ["360° Videos", "Guest Experience", "Custom Scenes"],
    },
  ];

  const handleBooking = (serviceName) => {
    // Optional: store selected service for booking page
    localStorage.setItem("selectedService", serviceName);
    navigate("/booking", {
      state: { serviceName },
    });// ✅ CONNECTED TO BOOKING PAGE
  };

  return (
    <div className="service-page">
      <h1>VR Event Packages</h1>

      <div className="services-grid">
        {services.map((item) => (
          <div className="service-card" key={item.id}>
            <h3>{item.type}</h3>
            <p className="price">Rs. {item.price} / day</p>

            <ul>
              {item.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <button onClick={() => handleBooking(item.type)}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;

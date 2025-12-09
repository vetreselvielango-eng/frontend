import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";

function Services() {
  const [services, setServices] = useState([]); //State – Where backend data is stored
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/services`)  //Fetches data from backend
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Service fetch failed", err));
  }, []);

  return (
    <div className="services-container">
      <h2>Our Services</h2>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service._id}>
            <img src={service.image} alt={service.name} />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p className="price">${service.price}</p>

            <button
              onClick={() =>
                navigate("/booking", {
                  state: { selectedService: service.name },
                })
              }
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;

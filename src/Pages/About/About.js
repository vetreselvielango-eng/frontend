import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page container">
      <h1>About Us</h1>

      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          We are a virtual reality service provider offering VR headset rentals
          and immersive event experiences for corporate functions, weddings,
          exhibitions, and gaming zones.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to make virtual reality accessible, affordable, and
          impactful for everyone.
        </p>

        <h2>Our Vision</h2>
        <p>
          To become a leading VR solution provider across events, training, and
          entertainment industries.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>VR Headset Rentals</li>
          <li>Corporate VR Events</li>
          <li>Wedding VR Booths</li>
          <li>Gaming Zone Setups</li>
          <li>Custom VR Solutions</li>
        </ul>

        <h2>Why Choose Us</h2>
        <ul>
          <li>High-quality VR devices</li>
          <li>Experienced on-site support</li>
          <li>Affordable pricing</li>
          <li>Trusted by multiple clients</li>
        </ul>
      </section>
    </div>
  );
}

export default About;

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// ✅ Import your background audio
import bgMusic from "../../assets/audio/Welcome to VR World.mp3";

function Home() {
  const audioRef = useRef(null);

  // ✅ Play music ONCE on Home load & stop on exit
  useEffect(() => {
    audioRef.current = new Audio(bgMusic);
    audioRef.current.volume = 0.4;   // soft background volume
    audioRef.current.loop = false;   // ✅ PLAY ONLY ONCE

    // Try to autoplay (browser may require user interaction)
    audioRef.current.play().catch(() => {
      console.log("Autoplay blocked by browser. User interaction required.");
    });

    // ✅ Stop music when leaving Home page
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Experience the Future with Virtual Reality</h1>
          <p>
            We provide VR rentals, corporate VR events, gaming zones, and custom
            VR solutions for businesses and entertainment.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="btn-primary">
              Explore Products
            </Link>
            <Link to="/booking" className="btn-secondary">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES HIGHLIGHT */}
      <section className="highlights">
        <h2>Our VR Services</h2>

        <div className="highlight-grid">
          <div className="card">
            <h3>VR Headset Rentals</h3>
            <p>Daily, weekly & monthly affordable VR headset rentals.</p>
          </div>

          <div className="card">
            <h3>Corporate VR Events</h3>
            <p>VR solutions for conferences, exhibitions & business demos.</p>
          </div>

          <div className="card">
            <h3>Gaming Zones</h3>
            <p>Complete VR gaming setups for entertainment centers.</p>
          </div>

          <div className="card">
            <h3>Custom VR Solutions</h3>
            <p>Startup demos, product launches & training simulations.</p>
          </div>
        </div>
      </section>

      {/* BUSINESS STORY */}
      <section className="story">
        <h2>Why Choose VR Experience?</h2>
        <p>
          VR Experience is a futuristic virtual reality service provider offering
          next-generation VR technology for businesses, events, and entertainment.
          Our mission is to bring immersive digital experiences into the real world.
        </p>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Ready to Enter Virtual Reality?</h2>
        <p>Book your VR experience today and explore the future.</p>
        <Link to="/contact" className="btn-primary">
          Contact Us
        </Link>
      </section>

    </div>
  );
}

export default Home;

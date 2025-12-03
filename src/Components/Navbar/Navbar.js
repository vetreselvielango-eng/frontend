import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ✅ Keep token always in sync
  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
    };

    // Listen to storage changes (login/logout in other tabs too)
    window.addEventListener("storage", syncToken);

    return () => window.removeEventListener("storage", syncToken);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);          // ✅ update state immediately
    alert("Logged out successfully");
    navigate("/login");     // ✅ NO reload
  };

  return (
    <nav className="navbar">
      <h2 className="logo">VR World</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/services">Services</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/contact">Contact</Link>

        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-btn">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

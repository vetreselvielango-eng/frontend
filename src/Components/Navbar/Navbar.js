import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "../../App";   // ✅ GLOBAL CONTEXT

function Navbar() {
  const navigate = useNavigate();

  // ✅ Now using BOTH token and user from GLOBAL CONTEXT
  const { token, setToken, user, setUser } = useContext(AuthContext);

  // ✅ Keep context in sync with localStorage (for refresh / multi-tab)
  useEffect(() => {
    const syncAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      setToken(storedToken);
      setUser(storedUser);
    };

    syncAuth(); // initial load
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, [setToken, setUser]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);           // ✅ clears admin instantly
    alert("Logged out successfully");
    navigate("/login");
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

            {/* ✅ ADMIN ONLY TAB — NOW LIVE (NO REFRESH NEEDED) */}
            {user?.isAdmin && <Link to="/admin">Admin Dashboard</Link>}

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




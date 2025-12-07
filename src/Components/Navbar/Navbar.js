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



// ----------------------- Updated Code with Context API -----------------------
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState, useContext, createContext } from "react";
// import "./Navbar.css";

// // ✅ Simple Auth Context (local to this file – no project-wide changes)
// const AuthContext = createContext(null);

// function Navbar() {
//   const navigate = useNavigate();
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   // ✅ Keep token always in sync (unchanged)
//   useEffect(() => {
//     const syncToken = () => {
//       setToken(localStorage.getItem("token"));
//     };

//     window.addEventListener("storage", syncToken);
//     return () => window.removeEventListener("storage", syncToken);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setToken(null);
//     alert("Logged out successfully");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       <NavbarContent logout={logout} />
//     </AuthContext.Provider>
//   );
// }

// // ✅ useContext is used here (no UI or logic change)
// function NavbarContent({ logout }) {
//   const { token } = useContext(AuthContext);

//   return (
//     <nav className="navbar">
//       <h2 className="logo">VR World</h2>

//       <div className="nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/products">Products</Link>
//         <Link to="/services">Services</Link>
//         <Link to="/booking">Booking</Link>
//         <Link to="/cart">Cart</Link>
//         <Link to="/contact">Contact</Link>

//         {token ? (
//           <>
//             <Link to="/dashboard">Dashboard</Link>
//             <button onClick={logout} className="logout-btn">
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/signup" className="signup-btn">
//               Signup
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// ----------------------- Previous Code (for reference) -----------------------
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./Navbar.css";

// function Navbar() {
//   const navigate = useNavigate();
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   // ✅ Keep token always in sync
//   useEffect(() => {
//     const syncToken = () => {
//       setToken(localStorage.getItem("token"));
//     };

//     // Listen to storage changes (login/logout in other tabs too)
//     window.addEventListener("storage", syncToken);

//     return () => window.removeEventListener("storage", syncToken);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token"); // ✅ remove token from localStorage
//     localStorage.removeItem("user");  // ✅ remove user info from localStorage
//     setToken(null);          // ✅ update state immediately
//     alert("Logged out successfully");
//     navigate("/login");     // ✅ Programmatic routing (JS-based). NO reload. Same effect as: <Link to="/login">Login</Link>
//   };

//   return (
//     <nav className="navbar">
//       <h2 className="logo">VR World</h2>

//       <div className="nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/products">Products</Link>
//         <Link to="/services">Services</Link>
//         <Link to="/booking">Booking</Link>
//         <Link to="/cart">Cart</Link>
//         <Link to="/contact">Contact</Link>

//         {token ? (
//           <>
//             <Link to="/dashboard">Dashboard</Link>
//             <button onClick={logout} className="logout-btn">
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/signup" className="signup-btn">
//               Signup
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

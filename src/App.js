import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Booking from "./Pages/Booking/Booking";
import Cart from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Products from "./Pages/Products/Products";
import Services from "./Pages/Services/Services";
import Signup from "./Pages/Signup/Signup";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Checkout from "./Pages/Checkout/Checkout";
import Success from "./Pages/Success/Success";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Cancel from "./Pages/Cancel/Cancel";

// Layout
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

// Protected Route
import PrivateRoute from "./utils/PrivateRoute";

// ✅ GLOBAL AUTH CONTEXT (App Level)
export const AuthContext = createContext();

// ✅ Admin Route (UNCHANGED)
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  // ✅ Context state (synced with localStorage, no behavior change)
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* ✅ PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          {/* ✅ PROTECTED USER ROUTES (UNCHANGED) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/booking"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

          {/* ✅ ADMIN ONLY ROUTE (UNCHANGED) */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* ✅ 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
// Previous version without Context API

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Pages
// import Home from "./Pages/Home/Home";
// import About from "./Pages/About/About";
// import Booking from "./Pages/Booking/Booking";
// import Cart from "./Pages/Cart/Cart";
// import Contact from "./Pages/Contact/Contact";
// import Login from "./Pages/Login/Login";
// import Products from "./Pages/Products/Products";
// import Services from "./Pages/Services/Services";
// import Signup from "./Pages/Signup/Signup";
// import NotFoundPage from "./Pages/NotFoundPage";
// import Dashboard from "./Pages/Dashboard/Dashboard";
// import Checkout from "./Pages/Checkout/Checkout";
// import Success from "./Pages/Success/Success";
// import AdminDashboard from "./Pages/Admin/AdminDashboard";
// import Cancel from "./Pages/Cancel/Cancel";

// // Layout
// import Navbar from "./Components/Navbar/Navbar";
// import Footer from "./Components/Footer/Footer";

// // Protected Route
// import PrivateRoute from "./utils/PrivateRoute";

// // ✅ Admin Route
// const AdminRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user || !user.isAdmin) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         {/* ✅ PUBLIC ROUTES */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/success" element={<Success />} />
//         <Route path="/cancel" element={<Cancel />} />

//         {/* ✅ PROTECTED USER ROUTES */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/booking"
//           element={
//             <PrivateRoute>
//               <Booking />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/cart"
//           element={
//             <PrivateRoute>
//               <Cart />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/checkout"
//           element={
//             <PrivateRoute>
//               <Checkout />
//             </PrivateRoute>
//           }
//         />

//         {/* ✅ ADMIN ONLY ROUTE */}
//         <Route
//           path="/admin"
//           element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         />

//         {/* ✅ 404 */}
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>

//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;

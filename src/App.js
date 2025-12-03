import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import NotFoundPage from "./Pages/NotFoundPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Checkout from "./Pages/Checkout/Checkout";
import Success from "./Pages/Success/Success";


// Layout
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

// ✅ Protected Route (ONLY ONE IMPORT)
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />

        {/* ✅ Protected Routes */}
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

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

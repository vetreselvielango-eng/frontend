import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";

// ✅ API Base URL
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL;

console.log("✅ API BASE:", API_BASE_URL);

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // ✅ Calculate total
  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );
  };

  // ✅ Stripe Checkout Handler (NEW FLOW)
  const handleStripeCheckout = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to continue checkout");
        setLoading(false);
        return;
      }

      if (!cartItems.length) {
        alert("Your cart is empty");
        setLoading(false);
        return;
      }

      // ✅ SAFE productId mapping
      const itemsForBackend = cartItems.map((item) => ({
        productId: item._id || item.id || item.productId,
        quantity: item.quantity || 1,
      }));

      console.log("✅ Sending to backend:", itemsForBackend);

      const response = await axios.post(
        `${API_BASE_URL}/api/checkout/create-session`,
        { items: itemsForBackend },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-access-token": token,
          },
        }
      );

      console.log("✅ Stripe backend response:", response.data);

      const sessionUrl = response.data?.url;

      if (!sessionUrl) {
        alert("Stripe session URL not received");
        setLoading(false);
        return;
      }

      // ✅ NEW STRIPE REDIRECT METHOD (NO Stripe.js redirect)
      window.location.href = sessionUrl;
    } catch (error) {
      console.error("❌ Stripe checkout error FULL:", error);
      console.error("❌ Stripe backend response:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Stripe session failed — check backend logs"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove item from cart
  const removeItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <p>Qty: {item.quantity || 1}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ${getTotal().toFixed(2)}</h2>
            <button
              className="pay-button"
              onClick={handleStripeCheckout}
              disabled={loading || cartItems.length === 0}
            >
              {loading ? "Redirecting to Stripe..." : "Pay with Stripe"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";

// ✅ API Base URL
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL; 

function Cart() {
  const [cartItems, setCartItems] = useState([]); // Cart items state. Stores all products in the cart. 
  const [loading, setLoading] = useState(false); // Loading state. Used to show “Redirecting to Stripe…” during checkout.

  // ✅ Load cart from localStorage
  useEffect(() => {                                                     //This way, cart is not lost when page refreshes 
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Default to empty array
    setCartItems(storedCart);                                           // Set cart items from localStorage
  }, []);

  // ✅ Calculate total
  const getTotal = () => { // Calculate total price
    return cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1), // sum up price * quantity for each item 
      0
    );
  };

  // ✅ Stripe Checkout Handler (NEW FLOW)
  const handleStripeCheckout = async () => {              // Handle Stripe checkout
    try {                                                 // Start try block
      setLoading(true);

  //No login = no payment allowed  
      const token = localStorage.getItem("token");  
      if (!token) {
        alert("Please login to continue checkout");
        setLoading(false);
        return;
      }

  //Cart is empty → stop payment
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

      // ✅ POST to backend to create Stripe session
      const response = await axios.post(                // Make POST request to backend
        `${API_BASE_URL}/api/checkout/create-session`,  // Backend endpoint
        { items: itemsForBackend },                     // Request body with cart items     
        {
          headers: {                                        
            "Content-Type": "application/json",         // Set content type    
            Authorization: `Bearer ${token}`,          // Auth header with token      
            "x-access-token": token,                      // Custom auth header with token          
          },
        }
      );

      console.log("✅ Stripe backend response:", response.data);

      const sessionUrl = response.data?.url;  // Get session URL from response
      
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
        error.response?.data?.message ||                 // Show backend error message if available
          "Stripe session failed — check backend logs"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove item from cart
  const removeItem = (index) => {  // Remove item at index
    const updated = [...cartItems];  // Copy current cart items
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

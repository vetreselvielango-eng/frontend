import React, { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // ✅ DUMMY PAYMENT → CREATE REAL ORDER
  const handlePayment = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!token) {
      alert("Please login to continue payment");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.qty,
        image: item.image,
      })),
      totalAmount,
      paymentMethod: "DUMMY",
      paymentStatus: "Paid",
      orderStatus: "Placed",
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Payment failed");
        return;
      }

      alert("✅ Payment successful & Order created");
      clearCart();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Server error during payment");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="cart-empty">Cart is Empty 🛒</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart-item-left">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                />
                <div>
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${item.price}</p>
                  <p>Qty: {item.qty}</p>
                </div>
              </div>

              <div className="cart-actions">
                <button onClick={() => increaseQty(item._id)}>+</button>
                <button onClick={() => decreaseQty(item._id)}>-</button>
                <button onClick={() => removeItem(item._id)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <p className="cart-total">Total: ${totalAmount}</p>

            <button className="cart-clear-btn" onClick={clearCart}>
              Clear Cart
            </button>

            <button className="cart-payment-btn" onClick={handlePayment}>
              Pay Now (Dummy)
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

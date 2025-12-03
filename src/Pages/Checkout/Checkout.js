import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51SZg3dBJJAVMOhTzduC6VscF34x1TXYRfwkhNLjxBDoFTFGXJCrvLqUpEH0G2k0CT7gzdKaHtSQiP1DFg1jxS8p400dJtEKXMc"); // ✅ keep your real key

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Get total from Cart
  const amount = location.state?.total || 0;

  // ✅ If no amount, go back to cart
  if (!amount || amount <= 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Send dynamic amount to backend
      const res = await fetch(
        "http://localhost:5000/api/payment/create-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      const data = await res.json();

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      setLoading(false);

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        navigate("/success");
      }
    } catch (error) {
      setLoading(false);
      alert("Payment Failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "50px auto" }}
    >
      <h2>Checkout</h2>
      <h3>Total Amount: ${amount}</h3>

      <CardElement />

      <button disabled={!stripe || loading} style={{ marginTop: "20px" }}>
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;

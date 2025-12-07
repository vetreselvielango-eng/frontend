import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";   // ✅ GLOBAL CONTEXT

function Login() {
  const navigate = useNavigate();

  // ✅ GLOBAL CONTEXT SETTERS (for instant Navbar update)
  const { setToken, setUser } = useContext(AuthContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ Auto-focus email on page load
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
        }
      );

      const data = await res.json();

      // ❌ If login failed
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ SAVE TO localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ UPDATE GLOBAL CONTEXT (FIXES NAVBAR REFRESH ISSUE)
      setToken(data.token);
      setUser(data.user);

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            ref={emailRef}   // ✅ Auto-focus + useRef
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            ref={passwordRef}
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={{ marginTop: "15px" }} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

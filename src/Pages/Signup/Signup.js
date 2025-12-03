import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Signup.css";

// function Signup() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     console.log(formData);

//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });
//   };

//   return (
//     <div className="signup-page container">
//       <h1>Signup</h1>

//       <form className="signup-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             onChange={handleChange}
//             value={formData.name}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             value={formData.email}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             value={formData.password}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             onChange={handleChange}
//             value={formData.confirmPassword}
//             required
//           />
//         </div>

//         <button type="submit">Submit</button>

//         <p>Already have an account?</p>
//         <Link to="/Login" className="link-login">Login</Link>
//       </form>
//     </div>
//   );
// }

// export default Signup;

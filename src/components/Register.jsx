import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    aadhaar: "",
    password: "",
    confirmPassword: "",
    role: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      console.log(response.data);
      navigate("/login"); // redirect to login after successful registration
    } catch (err) {
      console.error(err.response?.data); // <-- log full error from backend
      setError(err.response?.data?.message || "Registration failed");
    }

  };

  return (
    <div className={styles.register}>

      <div className={styles.formContainer}>
        <h2>Create Your Account</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <form onSubmit={handleRegister}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Choose a username" value={formData.username} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="10-digit mobile number" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="aadhaar">Aadhaar Card Number:</label>
            <input type="tel" id="aadhaar" name="aadhaar" pattern="[0-9]{12}" placeholder="12-digit aadhaar number" value={formData.aadhaar} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Create Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.roleLabel}>Role:</label>
            <label className={styles.radioInline}>
              <input type="radio" name="role" value="farmer" onChange={handleChange} required /> Farmer
              <input type="radio" name="role" value="buyer" onChange={handleChange} required /> Buyer
              {/* <input type="radio" name="role" value="admin" onChange={handleChange} required /> Admin */}

            </label>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Address:</label>
            <textarea id="address" name="address" rows="2" placeholder="Your residential address" value={formData.address} onChange={handleChange} required></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="district">District:</label>
            <input type="text" id="district" name="district" placeholder="Enter your district" value={formData.district} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="state">State:</label>
            <input type="text" id="state" name="state" placeholder="Enter your state" value={formData.state} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="pincode">Pincode:</label>
            <input type="text" id="pincode" name="pincode" pattern="[0-9]{6}" placeholder="6-digit pincode" value={formData.pincode} onChange={handleChange} required />
          </div>

          <label>
            <input type="checkbox" name="terms" required /> I agree to the{" "}
            <a href="#" target="_blank">Terms & Conditions</a>,{" "}
            <a href="#" target="_blank">Privacy Policy</a>, and{" "}
            <a href="#" target="_blank">Cookie Policy</a>.
          </label>

          <button type="submit" className={styles.submitBtn}>Register</button>
        </form>

        <div className={styles.loginLink}>
          Already have an account? <Link to="/login">Login hear</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;


import React, { useState } from "react";
import styles from "./Login.module.css";
import { FaLeaf, FaSeedling, FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      const user = response.data.user; // ✅ Extract the user object safely

      // ✅ Save JWT token and user info
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user._id); // ✅ fixed here

      // ✅ Redirect based on role
      if (user.role === "farmer") navigate("/farmer/dashboard");
      else if (user.role === "buyer") navigate("/buyer/dashboard");
      else if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/"); // default route
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <i className={`${styles.leafDecoration} ${styles.leaf1}`}><FaLeaf /></i>
      <i className={`${styles.leafDecoration} ${styles.leaf2}`}><FaSeedling /></i>

      <div className={styles.loginContainer}>
        <h2>ShetkariSathi Login</h2>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="username">
              <FaUser className={styles.roleIcon} /> Email or Username:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your email or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">
              <FaLock className={styles.roleIcon} /> Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            <FaSignInAlt style={{ marginRight: "8px" }} /> Login
          </button>
        </form>

        <div className={styles.registerLink}>
          Don’t have an account? Click <Link to="/register">Create new</Link>
        </div>

        <p className={styles.homeLink}>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token"); // remove JWT token
      localStorage.removeItem("user");  // remove user info
      navigate("/login");               // redirect to login page
    }
  };

  return (
    <button className={styles.logoutBtn} onClick={handleLogout}>
      <i className="fas fa-sign-out-alt"></i> Logout
    </button>
  );
};

export default LogoutButton;

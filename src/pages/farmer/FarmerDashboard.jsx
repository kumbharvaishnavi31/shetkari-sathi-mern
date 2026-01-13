
import React from "react";
import { Link } from "react-router-dom"; // import Link
import styles from "./FarmerDashboard.module.css";
import LogoutButton from "../../components/logout.jsx";
export default function FarmerDashboard() {
  return (
    <div>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <i className="fas fa-seedling"></i> ShetkariSathi
        </div>

        <div className={styles.userBox}>
          <div className={styles.userAvatar}>F</div>
          <span className={styles.userName}>Farmer Name</span>
          <LogoutButton/>
        </div>
      </header>

      {/* Dashboard */}
      <div className={styles.dashboardContainer}>
        <h2>👨‍🌾 Welcome, Farmer - Your ShetkariSathi Dashboard</h2>

        <div className={styles.dashboardGrid}>
          <div className={styles.card}>
            <div className={styles.addcrop}>
            <i className="fas fa-plus-circle"></i>
            <Link to="/add-product">Add Crop</Link>
          </div>
          </div>

          <div className={styles.card}>
            <i className="fas fa-leaf"></i>
            <Link to="/crop-solutions">Farming Tips</Link>
          </div>

          <div className={styles.card}>
            <i className="fas fa-landmark"></i>
            <Link to="/agriculture-schemes">Govt Schemes</Link>
          </div>

          <div className={styles.card}>
            <i className="fas fa-rupee-sign"></i>
            <Link to="/common/market-price">Market Prices</Link>
          </div>

          <div className={styles.card}>
            <i className="fas fa-box-open"></i>
            <Link to="/my-products">My Products</Link>
          </div>

          <div className={styles.card}>
            <i className="fas fa-handshake"></i>
            <Link to="/buyer-requests">Buyer Requests</Link>
          </div>

          <div className={styles.card}>
            <i className="fas fa-user-edit"></i>
            <Link to="/profile">My Profile</Link>
          </div>

          <div className={styles.card}>
            <i className="fas fa-comment-dots"></i>
            <Link to="/farmer/feedback">Give Feedback</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


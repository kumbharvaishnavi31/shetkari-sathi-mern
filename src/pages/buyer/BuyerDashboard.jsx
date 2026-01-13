
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BuyerDashboard.module.css";

export default function BuyerDashboard() {
  const navigate = useNavigate();

  return (
    <div className={styles.buyerDashboard}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <i className="fas fa-seedling"></i> ShetkariSathi
        </div>

        <div className={styles.userBox}>
          <div className={styles.userAvatar}>B</div>
          <span className={styles.userName}>Buyer Name</span>
          <button
            type="button"
            className={styles.logoutBtn}
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                alert("Logging out... Redirecting to login page.");
                navigate("/login");
              }
            }}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </header>

      <div className={styles.dashboardContainer}>
        <h2 className={styles.title}>🛒 Welcome, Buyer - Your ShetkariSathi Dashboard</h2>

        <div className={styles.dashboardGrid}>
          <Card icon="fa-seedling" text="Browse Products" link="/buyer/browseproduct" navigate={navigate} />
          <Card icon="fa-heart" text="My Wishlist" link="/buyer/wishlist" navigate={navigate} />
          <Card icon="fa-shopping-cart" text="My Orders" link="/buyer/orderhistory" navigate={navigate} />
          <Card icon="fa-clock" text="Pending Orders" link="/buyer/my-purchase-requests" navigate={navigate} />
          <Card icon="fa-chart-line" text="Market Prices" link="/common/marketprice" navigate={navigate} />
          <Card icon="fa-user-edit" text="My Profile" link="/buyer/profile" navigate={navigate} />
        </div>
      </div>
    </div>
  );
}

function Card({ icon, text, link, navigate }) {
  return (
    <div className={styles.card} onClick={() => navigate(link)}>
      <i className={`fas ${icon}`}></i>
      <span className={styles.cardLink}>{text}</span>
    </div>
  );
}


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./BuyerHeader.module.css";

export default function BuyerHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/buyer/dashboard", icon: "fa-th-large", label: "Dashboard" },
    { path: "/buyer/browseproduct", icon: "fa-shopping-basket", label: "Browse Products" },
    { path: "/common/marketprice", icon: "fa-chart-line", label: "Market Price" },
    { path: "/buyer/orderhistory", icon: "fa-receipt", label: "My Orders" },
    { path: "/buyer/wishlist", icon: "fa-heart", label: "Wishlist" },
    { path: "/buyer/my-purchase-requests", icon: "fa-hourglass-half", label: "Pending" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.logo}>
          <i className="fas fa-seedling"></i>
          <span>ShetkariSathi</span>
        </div>

        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>B</div>
          <span className={styles.userName}>Buyer</span>
        </div>
      </div>

      <div className={styles.navContainer}>
        <ul className={`${styles.navMenu} ${menuOpen ? styles.activeMenu : ""}`}>
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path}
                className={`${styles.navLink} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <i className={`fas ${item.icon}`}></i>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

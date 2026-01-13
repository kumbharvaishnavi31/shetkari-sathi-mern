// src/components/FarmerHeader.jsx
import React, { useState } from "react";
import styles from "./FarmerHeader.module.css";
import { NavLink } from "react-router-dom";
import { FaSeedling, FaThLarge, FaPlusCircle, FaBoxOpen, FaHandshake, FaChartLine, FaLightbulb, FaHandHoldingUsd, FaBars, FaLanguage } from "react-icons/fa";

export default function FarmerHeader({ farmerName = "Farmer" }) {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.logo}>
          <FaSeedling />
          <span>ShetkariSathi</span>
        </div>

        <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
          <FaBars />
        </button>

        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>{farmerName.charAt(0)}</div>
          <span className={styles.userName}>{farmerName}</span>
        </div>
      </div>

      <div className={styles.navContainer}>
        <ul className={`${styles.navMenu} ${menuActive ? styles.active : ""}`}>
          <li className={styles.navItem}>
            <NavLink to="/farmer/dashboard" className={styles.navLink}>
              <FaThLarge />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/add-product" className={styles.navLink}>
              <FaPlusCircle />
              <span>Add Crop</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/my-products" className={styles.navLink}>
              <FaBoxOpen />
              <span>My Products</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/buyer-requests" className={styles.navLink}>
              <FaHandshake />
              <span>Buyer Requests</span>
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink to="/crop-solutions" className={styles.navLink}>
              <FaLightbulb />
              <span>Farming Tips</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/agriculture-schemes" className={styles.navLink}>
              <FaHandHoldingUsd />
              <span>Gov Schemes</span>
            </NavLink>
          </li>
                    <li className={styles.navItem}>
            <NavLink to="/language-selector" className={styles.navLink}>
              <FaLanguage />
              <span>English</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

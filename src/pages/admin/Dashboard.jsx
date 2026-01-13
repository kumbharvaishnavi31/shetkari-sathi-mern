
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    crops: 0,
    requests: 0,
    transactions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <h1><i className="fas fa-leaf"></i> <span>ShetkariSathi</span></h1>
        </div>
        <ul className={styles.navLinks}>
          <li><Link to="/admin/dashboard" className={styles.navLinksActive}><i className="fas fa-home"></i> <span>Dashboard</span></Link></li>
          <li><Link to="/admin/manage-users"><i className="fas fa-users"></i> <span>Manage Users</span></Link></li>
          <li><Link to="/admin/manage-crops"><i className="fas fa-seedling"></i> <span>Manage Crops</span></Link></li>
          <li><Link to="/admin/manage-requests"><i className="fas fa-file-alt"></i> <span>Purchase Requests</span></Link></li>
          <li><Link to="/admin/manage-content"><i className="fas fa-file"></i> <span>Manage Content</span></Link></li>
          <li><Link to="/admin/transactions"><i className="fas fa-exchange-alt"></i> <span>Transactions</span></Link></li>
          <li><Link to="/"><i className="fas fa-sign-out-alt"></i> <span>Logout</span></Link></li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h2>Welcome, Admin!</h2>
          <p>Here's what's happening with your farm today.</p>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.iconUsers}`}>
              <i className="fas fa-users"></i>
            </div>
            <div className={styles.statContent}>
              <h3>{stats.users}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.iconCrops}`}>
              <i className="fas fa-seedling"></i>
            </div>
            <div className={styles.statContent}>
              <h3>{stats.crops}</h3>
              <p>Crop Listings</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.iconRequests}`}>
              <i className="fas fa-file-alt"></i>
            </div>
            <div className={styles.statContent}>
              <h3>{stats.requests}</h3>
              <p>Purchase Requests</p>
            </div>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Dashboard;

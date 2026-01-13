import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

const AdminLayout = () => {
  return (
    <div className={styles.dashboardWrapper}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <h1>
            <i className="fas fa-leaf"></i> <span>ShetkariSathi</span>
          </h1>
        </div>
        <ul className={styles.navLinks}>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/manage-users">Manage Users</Link></li>
          <li><Link to="/admin/manage-crops">Manage Crops</Link></li>
          <li><Link to="/admin/manage-requests">Purchase Requests</Link></li>
          <li><Link to="/admin/manage-content">Manage Content</Link></li>
          <li><Link to="/admin/transactions">Transactions</Link></li>
          <li><Link to="/admin/settings">Settings</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.welcome}>
            <h2>Welcome, Admin!</h2>
            <p>Here's what's happening with your farm today.</p>
          </div>
        </div>

        {/* Dynamic Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

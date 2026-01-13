import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./AdminHeader.module.css";

const AdminHeader = () => {
  const [mobileActive, setMobileActive] = useState(false);
  const location = useLocation();

  const toggleMobile = () => setMobileActive(!mobileActive);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileActive &&
        !e.target.closest(`.${styles.mobileNav}`) &&
        !e.target.closest(`.${styles.mobileToggle}`)
      ) {
        setMobileActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileActive]);

  const navLinks = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "fas fa-home" },
    {
      path: "#",
      label: "Management",
      icon: "fas fa-users-cog",
      dropdown: [
        { path: "/admin/manage-users", label: "Manage Users", icon: "fas fa-users" },
        { path: "/admin/manage-crops", label: "Manage Crops", icon: "fas fa-seedling" },
        { path: "/admin/manage-requests", label: "Purchase Requests", icon: "fas fa-file-alt" },
        { path: "/admin/manage-content", label: "Manage Content", icon: "fas fa-file" },
      ],
    },
    // { path: "/admin/transactions", label: "Transactions", icon: "fas fa-exchange-alt" },
    { path: "/admin/settings", label: "Settings", icon: "fas fa-cog" },
  ];

  const pageTitle = () => {
    // Determine breadcrumb active page
    const currentPath = location.pathname;
    const titles = {
      "/admin/dashboard": "Dashboard",
      "/admin/manage-users": "Manage Users",
      "/admin/manage-crops": "Manage Crops",
      "/admin/manage-requests": "Purchase Requests",
      "/admin/manage-content": "Manage Content",
      // "/admin/transactions": "Transactions",
      "/admin/settings": "Settings",
    };
    return titles[currentPath] || "Admin Panel";
  };

  return (
    <>
      <header className={styles.adminHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <i className="fas fa-leaf" style={{ fontSize: "28px", color: "#0d47a1" }}></i>
            <h1>Shetkari<span>Sathi</span></h1>
          </div>

          <div className={styles.navContainer}>
            <nav className={styles.mainNav}>
              {navLinks.map((link, idx) => (
                <div key={idx} className={link.dropdown ? styles.dropdown : styles.navItem}>
                  {link.dropdown ? (
                    <>
                      <span className={styles.navLink}>
                        <i className={link.icon}></i> {link.label}
                        <i className="fas fa-chevron-down" style={{ fontSize: "12px" }}></i>
                      </span>
                      <div className={styles.dropdownMenu}>
                        {link.dropdown.map((d, i) => (
                          <Link
                            key={i}
                            to={d.path}
                            className={`${styles.dropdownItem} ${
                              location.pathname === d.path ? styles.navLinkActive : ""
                            }`}
                          >
                            <i className={d.icon}></i> {d.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`${styles.navLink} ${
                        location.pathname === link.path ? styles.navLinkActive : ""
                      }`}
                    >
                      <i className={link.icon}></i> {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <button className={styles.mobileToggle} onClick={toggleMobile}>
              <i className={`fas ${mobileActive ? "fa-times" : "fa-bars"}`}></i>
            </button>

            <div className={styles.headerActions}>
              <div className={styles.searchBox}>
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search..." />
              </div>

              <div className={styles.actionIcon}>
                <i className="fas fa-bell"></i>
                <span className={styles.badge}>3</span>
              </div>

              <div className={styles.actionIcon}>
                <i className="fas fa-envelope"></i>
                <span className={styles.badge}>7</span>
              </div>

              <div className={styles.userMenu}>
                <div className={styles.userAvatar}>A</div>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>Admin User</div>
                  <div className={styles.userRole}>Administrator</div>
                </div>
                <i className="fas fa-chevron-down" style={{ fontSize: "12px" }}></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbContainer}>
          <div className={styles.breadcrumbItem}>
            <Link to="/dashboard"><i className="fas fa-home"></i> Dashboard</Link>
          </div>
          <div className={styles.breadcrumbDivider}>/</div>
          <div className={`${styles.breadcrumbItem} ${styles.active}`}>
            {pageTitle()}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${mobileActive ? styles.active : ""}`}>
        {navLinks.map((link, idx) => {
          if (link.dropdown) {
            return link.dropdown.map((d, i) => (
              <Link
                key={i}
                to={d.path}
                className={`${styles.mobileNavLink} ${
                  location.pathname === d.path ? styles.active : ""
                }`}
              >
                <i className={d.icon}></i> {d.label}
              </Link>
            ));
          } else {
            return (
              <Link
                key={idx}
                to={link.path}
                className={`${styles.mobileNavLink} ${
                  location.pathname === link.path ? styles.active : ""
                }`}
              >
                <i className={link.icon}></i> {link.label}
              </Link>
            );
          }
        })}
      </div>
    </>
  );
};

export default AdminHeader;

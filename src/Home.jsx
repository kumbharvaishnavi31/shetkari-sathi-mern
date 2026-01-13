import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import LanguageSelector from "./components/LanguageSelector";
import { FaLanguage } from "react-icons/fa";

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Floating decorative leaves */}
      <div className={`${styles.floatingLeaf} ${styles.leaf1}`}></div>
      <div className={`${styles.floatingLeaf} ${styles.leaf2}`}></div>

      {/* Language Selector */}
      <div className={styles.languageSelector}>
        <LanguageSelector/>
      </div>

      <header className={styles.header}>
        <h1 className={styles.h1}>Welcome to ShetkariSathi</h1>
        <p>Your complete digital farming solution - Grow, Sell, and Prosper</p>
      </header>

      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.navLink}>
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLink}>
              <i className="fas fa-info-circle"></i> About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={styles.navLink}>
              <i className="fas fa-envelope"></i> Contact Us
            </Link>
          </li>
          <li>
            <Link to="/login" className={styles.navLink}>
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          </li>
          <li>
            <Link to="/register" className={styles.navLink}>
              <i className="fas fa-user-plus"></i> Registration
            </Link>
          </li>
           <li>
            <Link to="/language-selector" className={styles.navLink}>
            <FaLanguage/>
              <i className="fas "></i> English
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroText}>
            <h2>Empowering Farmers with Digital Solutions</h2>
            <p>
              ShetkariSathi connects farmers directly with buyers, provides
              real-time market prices, valuable farming insights, and access to
              government schemes - all in your local language. Join thousands of
              farmers who are transforming their agricultural business with our
              platform.
            </p>
            <div className={styles.buttonContainer}>
              <Link to="/register" className={styles.btn}>
                <i className="fas fa-user-plus"></i> Register Now
              </Link>
              <Link to="/login" className={styles.btn}>
                <i className="fas fa-sign-in-alt"></i> Farmer Login
              </Link>
            </div>
          </div>

          <div className={styles.heroImage}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/040/519/847/non_2x/indian-farmer-growth-concept-vector.jpg"
              alt="Indian farmer with digital tools"
            />
          </div>
        </div>

        {/* Services Section */}
        <div className={styles.sectionTitle}>
          <h2>Our Services</h2>
        </div>

        <div className={styles.features}>
          

          <Link to="/farmer/market_price" className={styles.featureCardLink}>
            <div className={styles.featureCard}>
              <i className="fas fa-language"></i>
              <h3>MultiLanguage</h3>
              <p>Connect easily in your own language. We support multiple regional languages for better understanding.</p>
            </div>
          </Link>

          <Link to="/farmer/farming_tips" className={styles.featureCardLink}>
            <div className={styles.featureCard}>
              <i className="fas fa-lightbulb"></i>
              <h3>Farming Tips</h3>
              <p>Seasonal advice, crop rotation guidance, and best practices from experts.</p>
            </div>
          </Link>

          <Link to="/common/marketprice" className={styles.featureCardLink}>
            <div className={styles.featureCard}>
              <i className="fas fa-chart-line"></i>
              <h3>Market Price</h3>
              <p>Stay updated with real-time crop prices to make better selling and buying decisions.</p>
            </div>
          </Link>

          <Link to="/farmer/govt_schemes" className={styles.featureCardLink}>
            <div className={styles.featureCard}>
              <i className="fas fa-file-invoice-dollar"></i>
              <h3>Government Schemes</h3>
              <p>Information about subsidies, loans, and government programs for farmers.</p>
            </div>
          </Link>
        </div>

        {/* Video Overlay */}
        <div className={styles.overlayContainer}>
          <video autoPlay loop muted playsInline>
            <source src="Video-826.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.textContent}>
            <h2>Fresh From Our Fields</h2>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2025 ShetkariSathi | Empowering Indian Farmers Through Technology</p>
      </footer>
    </div>
  );
};

export default Home;

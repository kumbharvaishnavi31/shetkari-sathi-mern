
import React, { useState, useEffect } from "react";
import BuyerHeader from "../../components/BuyerHeader";
import styles from "./Wishlist.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const buyerId = storedUser?._id;

  useEffect(() => {
    if (!buyerId) return;

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/wishlist/${buyerId}`);
        setWishlist(res.data);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };

    fetchWishlist();
  }, [buyerId]);

  const handleRemove = async (cropId) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${buyerId}/${cropId}`);
      setWishlist((prev) => prev.filter((item) => item._id !== cropId));
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item from wishlist.");
    }
  };

  return (
    <div>
      <BuyerHeader />
      <div className={styles.container}>
        <h1 className={styles.title}>
          <i className={`fas fa-heart ${styles.titleIcon}`}></i> My Wishlist
        </h1>

        {wishlist.length > 0 ? (
          <div className={styles.grid}>
            {wishlist.map((item) => (
              <div key={item._id} className={styles.card}>
                <div className={styles.imgWrap}>
                  <img src={item.image} alt={item.name} className={styles.img} />
                  {item.priceDrop && (
                    <span className={styles.priceDrop}>
                      <i className="fas fa-arrow-down"></i> Price Dropped!
                    </span>
                  )}
                </div>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.price}>
                  <i className="fas fa-indian-rupee-sign"></i> {item.price}
                </p>
                <p className={styles.farmer}>
                  <i className="fas fa-user"></i> Farmer: {item.farmerName || item.farmer}
                </p>
                <div className={styles.actions}>
                  <button className={`${styles.btn} ${styles.request}`}>
                    <i className="fas fa-shopping-cart"></i>
                    <Link
                      to={`/buyer/purchaserequest/${item._id}`}
                      className={styles.requestLink}
                    >
                      Request
                    </Link>
                  </button>
                  <button
                    className={`${styles.btn} ${styles.remove}`}
                    onClick={() => handleRemove(item._id)}
                  >
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <i className={`fas fa-heart ${styles.emptyIcon}`}></i>
            <p className={styles.emptyText}>Your wishlist is empty</p>
            <Link to="/browse_product">
              <button className={styles.browseBtn}>
                <i className="fas fa-store"></i> Browse Products
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

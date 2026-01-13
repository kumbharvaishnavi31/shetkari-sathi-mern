
import React, { useState, useEffect } from "react";
import BuyerHeader from "../../components/BuyerHeader";
import styles from "./BrowseProduct.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BrowseProduct() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const buyerId = storedUser?._id;

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/crops");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCrops();
  }, []);

  useEffect(() => {
    if (!buyerId) return;
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/wishlist/${buyerId}`);
        const cropIds = res.data.map((item) => item._id);
        setWishlist(cropIds);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };
    fetchWishlist();
  }, [buyerId]);

  const toggleWishlist = async (cropId) => {
    if (!buyerId) return alert("Please login to save wishlist");
    try {
      if (wishlist.includes(cropId)) {
        await axios.delete(`http://localhost:5000/api/wishlist/${buyerId}/${cropId}`);
        setWishlist((prev) => prev.filter((id) => id !== cropId));
      } else {
        await axios.post(`http://localhost:5000/api/wishlist/${buyerId}`, { crop: cropId });
        setWishlist((prev) => [...prev, cropId]);
      }
    } catch (err) {
      console.error("Wishlist action failed:", err);
      alert("Failed to update wishlist");
    }
  };

  return (
    <>
      <BuyerHeader />
      <div className={styles.container}>
        <h1 className={styles.title}>
          <i className="fas fa-store"></i> ShetkariSathi Marketplace
        </h1>

        <div className={styles.productGrid}>
          {products.map((p) => (
            <div className={styles.productCard} key={p._id}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p className={styles.price}>
                <i className="fas fa-indian-rupee-sign"></i> {p.price}
              </p>
              <p className={styles.farmer}>
                <i className="fas fa-user"></i> Farmer: {p.farmerName || p.farmer}
              </p>
              <div className={styles.actions}>
                <button
                  className={`${styles.btn} ${styles.wishlist} ${
                    wishlist.includes(p._id) ? styles.active : ""
                  }`}
                  onClick={() => toggleWishlist(p._id)}
                >
                  <i className="fas fa-heart"></i>{" "}
                  {wishlist.includes(p._id) ? "Saved" : "Wishlist"}
                </button>
                <button className={`${styles.btn} ${styles.request}`}>
                  <i className="fas fa-shopping-cart"></i>
                  <Link to={`/buyer/purchaserequest/${p._id}`} className={styles.buyLink}>
                    Buy Now
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


import React, { useState } from "react";
import BuyerHeader from "../../components/BuyerHeader";
import styles from "./PurchaseRequest.module.css";

const PurchaseRequest = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 5000);
  };

  return (
    <div>
      <BuyerHeader />
      <div className={styles.container}>
        <h1>
          <i className="fas fa-cart-plus"></i> Place Your Order
        </h1>

        {/* Product information */}
        <div className={styles.productInfo}>
          <img
            src="https://placehold.co/300x200/e8f5e9/2e7d32?text=Organic+Wheat"
            alt="Organic Wheat"
            className={styles.productImage}
          />
          <div className={styles.productDetails}>
            <h2>
              <i className="fas fa-wheat"></i> Organic Wheat
            </h2>
            <p className={styles.productPrice}>
              <i className="fas fa-indian-rupee-sign"></i> 1,800 / 50 kg
            </p>
            <p className={styles.productFarmer}>
              <i className="fas fa-user"></i> Farmer: Ramesh Kumar
            </p>
          </div>
        </div>

        {/* Confirmation message */}
        {showConfirmation && (
          <div className={styles.confirmation}>
            <i className="fas fa-check-circle"></i> Request sent successfully!
          </div>
        )}

        {/* Purchase form */}
        <form className={styles.requestForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="quantity">
              <i className="fas fa-weight"></i> Quantity (kg):
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              required
              placeholder="Enter quantity in kg"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">
              <i className="fas fa-comment"></i> Message (optional):
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Any specific instructions or delivery preferences"
            ></textarea>
          </div>

          <button type="submit" className={styles.submitBtn}>
            <i className="fas fa-paper-plane"></i> Send Request
          </button>
        </form>

        {/* Suggested similar products */}
        <section className={styles.suggestions}>
          <h2>
            <i className="fas fa-lightbulb"></i> Other Similar Products You Might Like
          </h2>
          <div className={styles.suggestionGrid}>
            {[
              {
                img: "https://placehold.co/300x200/e8f5e9/2e7d32?text=Natural+Wheat",
                name: "Natural Wheat",
                price: "1,600 / 40 kg",
              },
              {
                img: "https://placehold.co/300x200/e8f5e9/2e7d32?text=Whole+Wheat",
                name: "Whole Wheat",
                price: "1,700 / 45 kg",
              },
              {
                img: "https://placehold.co/300x200/e8f5e9/2e7d32?text=Premium+Wheat",
                name: "Premium Wheat",
                price: "2,000 / 50 kg",
              },
            ].map((item, index) => (
              <div key={index} className={styles.suggestionCard}>
                <img src={item.img} alt={item.name} />
                <p>
                  <i className="fas fa-wheat"></i> {item.name}
                </p>
                <p className={styles.price}>
                  <i className="fas fa-indian-rupee-sign"></i> {item.price}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PurchaseRequest;

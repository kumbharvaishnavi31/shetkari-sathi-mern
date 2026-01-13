
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BuyerHeader from "../../components/BuyerHeader";
import axios from "axios";
import styles from "./PurchaseRequestForm.module.css";

export default function PurchaseRequestForm() {
  const { cropId } = useParams();
  const [crop, setCrop] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [success, setSuccess] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const buyerId = storedUser?.userId;

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/crops/${cropId}`);
        setCrop(res.data);
        setTotalPrice(res.data.price);
      } catch (err) {
        console.error("Failed to fetch crop:", err);
      }
    };
    if (cropId) fetchCrop();
  }, [cropId]);

  useEffect(() => {
    if (crop) setTotalPrice(quantity * crop.price);
  }, [quantity, crop]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!crop) return;

    try {
      const res = await axios.post("http://localhost:5000/api/purchase_requests", {
        crop: crop._id,
        quantity,
        totalPrice: quantity * crop.price,
        paymentMethod: e.target.paymentMethod.value,
        notes: e.target.notes.value,
        buyer: buyerId,
      });

      console.log("Response:", res.data);
      setSuccess(true);
      e.target.reset();
      setQuantity(1);
      alert("✅ Your purchase request was sent successfully!");
    } catch (err) {
      console.error("Failed to submit purchase request:", err);
      alert("❌ Failed to submit purchase request. Please try again.");
    }
  };

  if (!crop) return <p>Loading crop details...</p>;

  return (
    <>
      <BuyerHeader />
      <div className={styles.container}>
        <h1 className={styles.title}>Purchase Crop</h1>

        <div className={styles.cropDetails}>
          <img src={crop.image} alt={crop.name} className={styles.cropImage} />
          <div className={styles.info}>
            <h2>{crop.name}</h2>
            <p>Price per unit: ₹{crop.price}</p>
            <p>Available Quantity: {crop.quantity}</p>
            <p>Farmer: {crop.farmerName || crop.farmer}</p>
          </div>
        </div>

        {success && <p className={styles.success}>Request submitted successfully!</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Quantity</label>
            <input
              type="number"
              min="1"
              max={crop.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className={styles.input}
            />
            <p>Total Price: ₹{totalPrice}</p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Payment Method</label>
            <select name="paymentMethod" required className={styles.select}>
              <option value="">Select payment method</option>
              <option value="cash">Cash on Delivery</option>
              <option value="upi">UPI</option>
              <option value="bank">Bank Transfer</option>
              <option value="card">Credit/Debit Card</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Additional Notes</label>
            <textarea
              name="notes"
              placeholder="Any notes..."
              className={styles.textarea}
            ></textarea>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.btnPrimary}>
              Confirm & Buy
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

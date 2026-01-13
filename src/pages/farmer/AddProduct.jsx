
import React, { useState } from "react";
import FarmerHeader from "../../components/FarmerHeader";
import styles from "./AddProduct.module.css";
import axios from "axios";

export default function AddProduct() {
  const [cropPreview, setCropPreview] = useState(null);

  // Use UUID from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const farmerId = storedUser?.userId || storedUser?._id;

  // Handle image upload and convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        setCropPreview(ev.target.result); // Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate image
    if (!cropPreview) {
      alert("Please select an image for the crop");
      return;
    }

    // Validate payment method
    const paymentMethod = e.target["payment-method"].value;
    if (!paymentMethod) {
      alert("Select a payment method");
      return;
    }

    const cropData = {
      name: e.target["crop-name"].value,
      type: e.target["crop-type"].value,
      price: Number(e.target["crop-price"].value),
      quantity: Number(e.target["crop-quantity"].value),
      tips: e.target["crop-tips"].value || "",
      image: cropPreview,
      paymentMethods: [paymentMethod],
      farmer: farmerId, // UUID
    };

    console.log("Sending crop data:", cropData);

    try {
      const res = await axios.post("http://localhost:5000/api/crops", cropData);
      console.log("Crop added:", res.data);
      alert("✅ Crop added successfully!");
      e.target.reset();
      setCropPreview(null);
    } catch (err) {
      console.error("Failed to add crop:", err.response?.data || err.message);
      alert("❌ Failed to add crop. Check console for details.");
    }
  };

  return (
    <div>
      <FarmerHeader />

      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Add New Crop</h1>
          <p>Fill in the details below to add a new crop</p>
        </header>

        <div className={styles.formContainer}>
          <form onSubmit={handleFormSubmit}>
            {/* Crop Information */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Crop Information</h2>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="crop-name">Crop Name *</label>
                  <input type="text" id="crop-name" name="crop-name" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="crop-type">Crop Type *</label>
                  <select id="crop-type" name="crop-type" required>
                    <option value="">Select type</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="fruit">Fruit</option>
                    <option value="grain">Grain</option>
                    <option value="legume">Legume</option>
                    <option value="tuber">Tuber</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="crop-price">Price per Unit (₹) *</label>
                  <input type="number" id="crop-price" name="crop-price" required min="0" step="0.01" />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="crop-quantity">Quantity Available *</label>
                  <input type="number" id="crop-quantity" name="crop-quantity" required min="0" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="crop-tips">Additional Tips</label>
                <textarea id="crop-tips" name="crop-tips"></textarea>
              </div>
            </div>

            {/* Crop Image */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Crop Image *</h2>
              <div
                className={styles.imageUpload}
                onClick={() => document.getElementById("crop-image").click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = e.dataTransfer.files;
                  if (files.length) handleImageChange({ target: { files } });
                }}
              >
                {!cropPreview ? (
                  <>
                    <div className={styles.uploadIcon}>📷</div>
                    <p>Click to upload or drag & drop</p>
                  </>
                ) : (
                  <img src={cropPreview} alt="Crop preview" className={styles.cropPreview} />
                )}
              </div>
              <input type="file" id="crop-image" name="crop-image" accept="image/*" required style={{ display: "none" }} onChange={handleImageChange} />
            </div>

            {/* Payment Info */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Payment Method *</h2>
              <select id="payment-method" name="payment-method" required>
                <option value="">Select payment method</option>
                <option value="cash">Cash on Delivery</option>
                <option value="upi">UPI</option>
                <option value="bank">Bank Transfer</option>
                <option value="card">Credit/Debit Card</option>
              </select>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary}>Add Crop</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

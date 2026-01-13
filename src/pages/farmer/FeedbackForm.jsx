import React, { useState, useRef } from "react";
import styles from "./FeedbackForm.module.css";
import FarmerHeader from "../../components/FarmerHeader";
import axios from "axios";
const FeedbackForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    rating: "",
  });
  const progressBarRef = useRef(null);

  const steps = [
    { id: 1, label: "Full Name" },
    { id: 2, label: "Email" },
    { id: 3, label: "Feedback & Rating" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return formData.name.trim() !== "";
      case 1:
        return /\S+@\S+\.\S+/.test(formData.email);
      case 2:
        return formData.feedback.trim() !== "" && formData.rating !== "";
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      alert("Please fill in all fields correctly before proceeding.");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateStep(currentStep)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  try {
    // Send data to backend
    await axios.post("http://localhost:5000/api/feedback", formData);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      if (progressBarRef.current) progressBarRef.current.style.width = `${progress}%`;
      if (progress >= 100) {
        clearInterval(interval);
        alert("Thank you for your feedback! 🌾");
        setFormData({ name: "", email: "", feedback: "", rating: "" });
        setCurrentStep(0);
        if (progressBarRef.current) progressBarRef.current.style.width = "0%";
      }
    }, 20);

  } catch (err) {
    console.error(err);
    alert("Failed to submit feedback. Please try again later.");
  }
};
 

  return (
    <div>
      <FarmerHeader/>
    
    <div className={styles.formContainer}>
      <h2>🌾 Agriculture Feedback Form</h2>

      <div className={styles.progressbar}>
        {steps.map((_, index) => (
          <div
            key={index}
            className={`${styles.progressStep} ${
              currentStep >= index ? styles.active : ""
            }`}
          ></div>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Step 1 */}
        {currentStep === 0 && (
          <div className={`${styles.step} ${styles.active}`}>
            <label htmlFor="name">👨‍🌾 Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 1 && (
          <div className={`${styles.step} ${styles.active}`}>
            <label htmlFor="email">📧 Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 2 && (
          <div className={`${styles.step} ${styles.active}`}>
            <label htmlFor="feedback">📝 Your Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Write your feedback..."
              required
            />
            <label htmlFor="rating">🌟 Rate this Project</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Rating --</option>
              <option value="Excellent">🌾 Excellent</option>
              <option value="Good">🌿 Good</option>
              <option value="Average">🌱 Average</option>
              <option value="Poor">🥀 Poor</option>
            </select>
          </div>
        )}

        {/* Buttons */}
        <div className={styles.btnGroup}>
          <button type="button" onClick={prevStep} disabled={currentStep === 0}>
            ⬅ Previous
          </button>
          {currentStep < steps.length - 1 && (
            <button type="button" onClick={nextStep}>
              Next ➡
            </button>
          )}
        </div>

        {/* Submit */}
        {currentStep === steps.length - 1 && (
          <div className={styles.submitBtnWrapper}>
            <button type="submit" className={styles.submitBtn}>
              <div className={styles.progressBar} ref={progressBarRef}></div>
              <span className={styles.btnText}>🚀 Submit Feedback</span>
            </button>
          </div>
        )}
      </form>
    </div>
    </div>
  );
};

export default FeedbackForm;

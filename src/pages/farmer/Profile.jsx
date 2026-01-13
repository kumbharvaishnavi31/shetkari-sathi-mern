
import React, { useEffect, useState } from "react";
import axios from "axios";
import FarmerHeader from "../../components/FarmerHeader";
import styles from "./Profile.module.css";

const FarmerProfile = () => {
  const [farmer, setFarmer] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  //  Fetch farmer details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get ID from localStorage (UUID type)
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("⚠️ No userId found in localStorage");
          return;
        }

        // Fetch user by userId (custom field, not _id)
        const res = await axios.get(`http://localhost:5000/api/users/id/${userId}`);
        setFarmer(res.data);
        setFormData(res.data);
      } catch (error) {
        console.error("❌ Error fetching farmer profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // 📝 Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 💾 Save updated profile
  const handleSave = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/users/id/${farmer._id}`, formData);
      setFarmer(res.data);
      setEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("Failed to update profile!");
    }
  };

  if (!farmer) {
    return (
      <div className={styles.body}>
        <FarmerHeader />
        <p className={styles.loading}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <FarmerHeader />

      <div className={styles.container}>
        <h1 className={styles.title}>👩‍🌾 Farmer Profile</h1>

        <div className={styles.profileCard}>
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Phone", name: "phone" },
            { label: "Aadhaar", name: "aadhaar", readonly: true },
            { label: "Address", name: "address" },
            { label: "District", name: "district" },
            { label: "State", name: "state" },
            { label: "Pincode", name: "pincode" },
          ].map((field, idx) => (
            <div className={styles.row} key={idx}>
              <label>{field.label}:</label>
              {editing && !field.readonly ? (
                <input
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              ) : (
                <span>{farmer[field.name]}</span>
              )}
            </div>
          ))}

          <div className={styles.buttons}>
            {editing ? (
              <>
                <button className={styles.saveBtn} onClick={handleSave}>
                  💾 Save
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setEditing(false)}
                >
                  ✖ Cancel
                </button>
              </>
            ) : (
              <button
                className={styles.editBtn}
                onClick={() => setEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;

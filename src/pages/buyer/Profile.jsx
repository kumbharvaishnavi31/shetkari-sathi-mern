import React, { useEffect, useState } from "react";
import axios from "axios";
import BuyerHeader from "../../components/BuyerHeader"; // make sure you have this component
import styles from "./Profile.module.css"; // you can reuse same CSS file

const BuyerProfile = () => {
  const [buyer, setBuyer] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // 🧩 Fetch buyer profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("⚠️ No userId found in localStorage");
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/users/id/${userId}`);
        setBuyer(res.data);
        setFormData(res.data);
      } catch (error) {
        console.error("❌ Error fetching buyer profile:", error);
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
      const res = await axios.put(`http://localhost:5000/api/users/id/${buyer._id}`, formData);
      setBuyer(res.data);
      setEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("Failed to update profile!");
    }
  };

  if (!buyer) {
    return (
      <div className={styles.body}>
        <BuyerHeader />
        <p className={styles.loading}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <BuyerHeader />

      <div className={styles.container}>
        <h1 className={styles.title}>🛒 Buyer Profile</h1>

        <div className={styles.profileCard}>
          {[ 
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Phone", name: "phone" },
            { label: "Address", name: "address" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "Pincode", name: "pincode" },
          ].map((field, idx) => (
            <div className={styles.row} key={idx}>
              <label>{field.label}:</label>
              {editing ? (
                <input
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              ) : (
                <span>{buyer[field.name]}</span>
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

export default BuyerProfile;


import React, { useEffect, useState } from "react";
import axios from "axios";
import FarmerHeader from "../../components/FarmerHeader";
import styles from "./BuyerRequests.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // for icons

const BuyerRequests = () => {
  const [requests, setRequests] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const farmerId = storedUser?.userId;

  console.log("Farmer ID:", farmerId);

  // Fetch admin-approved requests for this farmer
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/purchase_requests/farmer/${farmerId}`
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
        alert("Failed to fetch requests");
      }
    };
    if (farmerId) fetchRequests();
  }, [farmerId]);

  // Accept / Reject request
  const handleAction = async (requestId, action) => {
    try {
      await axios.put(
        `http://localhost:5000/api/purchase_requests/farmer/${requestId}`,
        { farmerStatus: action === "accept" ? "Approved" : "Rejected" }
      );

      // Remove from list after action
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
      alert(`Request ${action === "accept" ? "accepted" : "rejected"} successfully`);
    } catch (err) {
      console.error("Failed to update request:", err);
      alert("Failed to update request");
    }
  };

  return (
    <div className={styles.page}>
      <FarmerHeader />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>
            <i className="fas fa-handshake"></i> Buyer Requests
          </h1>
        </div>

        <table className={styles.requestsTable}>
          <thead>
            <tr>
              <th>Buyer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.buyer?.name || req.buyer || "Unknown"}</td>
                  <td>{req.crop?.name || "Unknown"}</td>
                  <td>{req.quantity}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusPending}`}>
                      Pending
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button
                      className={styles.acceptBtn}
                      onClick={() => handleAction(req._id, "accept")}
                    >
                      <i className="fas fa-check-circle"></i> Accept
                    </button>
                    <button
                      className={styles.rejectBtn}
                      onClick={() => handleAction(req._id, "reject")}
                    >
                      <i className="fas fa-times-circle"></i> Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.emptyRow}>
                  <i className="fas fa-box-open"></i> No requests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className={styles.footer}>
        © 2025 AgriConnect | Empowering Farmers & Buyers
      </footer>
    </div>
  );
};

export default BuyerRequests;

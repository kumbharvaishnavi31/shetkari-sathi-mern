
import React, { useEffect, useState } from "react";
import BuyerHeader from "../../components/BuyerHeader";
import axios from "axios";
import styles from "./MyPurchaseRequests.module.css";

export default function MyPurchaseRequests() {
  const [requests, setRequests] = useState([]);

  // ✅ Get buyer info from localStorage
  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // Use UUID (userId), not Mongo _id
  const buyerId = storedUser?.userId;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        console.log("Fetching purchase requests for buyer:", buyerId);
        const res = await axios.get(
          `http://localhost:5000/api/purchase_requests?buyerId=${buyerId}`
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching buyer requests:", err);
      }
    };

    if (buyerId) fetchRequests();
  }, [buyerId]);

  return (
    <>
      <BuyerHeader />
      <div className={styles.purchasePage}>
        <div className={styles.container}>
          <h1>My Purchase Requests</h1>

          <div className={styles.tableContainer}>
            <table className={styles.requestsTable}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req) => {
                    const approved =
                      req.adminStatus === "Approved" &&
                      req.farmerStatus === "Approved";
                    const statusClass =
                      req.adminStatus === "Rejected" ||
                      req.farmerStatus === "Rejected"
                        ? styles.rejected
                        : approved
                        ? styles.approved
                        : styles.pending;

                    return (
                      <tr key={req._id}>
                        <td>{req.cropName || req.crop?.name || "Unknown Crop"}</td>
                        <td>{req.quantity}</td>
                        <td>
                          {req.createdAt
                            ? new Date(req.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          <span className={`${styles.status} ${statusClass}`}>
                            {req.adminStatus === "Rejected" ||
                            req.farmerStatus === "Rejected"
                              ? "Rejected"
                              : approved
                              ? "Approved"
                              : "Pending"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.noData}>
                      No purchase requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

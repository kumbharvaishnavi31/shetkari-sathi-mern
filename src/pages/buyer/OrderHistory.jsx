
import React, { useEffect, useState } from "react";
import BuyerHeader from "../../components/BuyerHeader";
import axios from "axios";
import styles from "./OrderHistory.module.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const buyerId = storedUser?.userId;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!buyerId) return;

        const res = await axios.get(
          `http://localhost:5000/api/purchase_requests/buyer/${buyerId}/orders`
        );

        const formattedOrders = res.data.map((o) => ({
          product: o.crop?.name || "Unknown Crop",
          qty: o.quantity + " kg",
          date: new Date(o.createdAt).toLocaleDateString(),
          total: o.totalPrice || o.quantity * (o.crop?.price || 0),
          status:
            o.adminStatus === "Approved" && o.farmerStatus === "Approved"
              ? "delivered"
              : "processing",
          iconClass: "fas fa-seedling",
          bgClass: styles.default,
        }));

        setOrders(formattedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [buyerId]);

  const handleReorder = (product) => {
    alert(`Reordering ${product}...`);
  };

  return (
    <div>
      <BuyerHeader />
      <div className={styles.orderPage}>
        <div className={styles.container}>
          <h1>
            <i className="fas fa-history"></i> Order History
          </h1>

          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th>
                  <i className="fas fa-shopping-basket"></i> Product
                </th>
                <th>
                  <i className="fas fa-weight"></i> Quantity
                </th>
                <th className={styles.mobileHidden}>
                  <i className="far fa-calendar-alt"></i> Date
                </th>
                <th>
                  <i className="fas fa-indian-rupee-sign"></i> Total
                </th>
                <th className={styles.mobileHidden}>
                  <i className="fas fa-truck"></i> Status
                </th>
                <th>
                  <i className="fas fa-cog"></i> Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <div className={styles.productCell}>
                        <div className={`${styles.productIcon} ${order.bgClass}`}>
                          <i className={order.iconClass}></i>
                        </div>
                        {order.product}
                      </div>
                    </td>
                    <td>{order.qty}</td>
                    <td className={styles.mobileHidden}>{order.date}</td>
                    <td>{order.total}</td>
                    <td className={styles.mobileHidden}>
                      <span
                        className={`${styles.status} ${
                          order.status === "delivered"
                            ? styles.delivered
                            : styles.processing
                        }`}
                      >
                        {order.status === "delivered" && (
                          <i className="fas fa-check-circle"></i>
                        )}
                        {order.status === "processing" && (
                          <i className="fas fa-spinner"></i>
                        )}
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <button
                        className={styles.reorderBtn}
                        onClick={() => handleReorder(order.product)}
                      >
                        <i className="fas fa-redo-alt"></i> <span>Reorder</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

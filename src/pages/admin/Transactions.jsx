import React, { useState } from "react";
import styles from "./Transactions.module.css";
import { 
  faChartLine, faArrowUp, faArrowDown, faSort, faPrint, faDownload 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminHeader from "../../components/AdminHeader";

const Transactions = () => {
  const [transactions] = useState([
    { id: "TXN001", buyer: "Buyer A", farmer: "Farmer X", product: "Wheat", amount: "₹1200", date: "18-09-2025", status: "Completed" },
    { id: "TXN002", buyer: "Buyer B", farmer: "Farmer Y", product: "Rice", amount: "₹2000", date: "18-09-2025", status: "Pending" },
    { id: "TXN003", buyer: "Buyer C", farmer: "Farmer Z", product: "Corn", amount: "₹1750", date: "17-09-2025", status: "Completed" },
    { id: "TXN004", buyer: "Buyer D", farmer: "Farmer W", product: "Tomatoes", amount: "₹950", date: "17-09-2025", status: "Completed" },
    { id: "TXN005", buyer: "Buyer E", farmer: "Farmer V", product: "Potatoes", amount: "₹3100", date: "16-09-2025", status: "Pending" },
  ]);

  const handleDownload = () => {
    alert("Report download started! This would generate a CSV file in a real application.");
  };

  return (
    <div>
        <AdminHeader />
    <div className={styles.container}>
      <div className={styles.header}>
        <h1><FontAwesomeIcon icon={faChartLine} /> Transactions & Reports</h1>
        <div className={styles.userInfo}>Welcome, Admin</div>
      </div>

      <div className={styles.statsCards}>
        <div className={styles.statCard}>
          <h3>TOTAL TRANSACTIONS</h3>
          <div className={styles.value}>₹42,800</div>
          <div className={styles.change}><FontAwesomeIcon icon={faArrowUp} /> 12% from last week</div>
        </div>
        <div className={styles.statCard}>
          <h3>COMPLETED TRANSACTIONS</h3>
          <div className={styles.value}>38</div>
          <div className={styles.change}><FontAwesomeIcon icon={faArrowUp} /> 8% from last week</div>
        </div>
        <div className={styles.statCard}>
          <h3>PENDING TRANSACTIONS</h3>
          <div className={styles.value}>5</div>
          <div className={styles.change}><FontAwesomeIcon icon={faArrowDown} /> 2 from last week</div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.filterGroup}>
          <label>Date Range</label>
          <select>
            <option>Last 7 days</option>
            <option selected>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom Range</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label>Status</label>
          <select>
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label>Search</label>
          <input type="text" placeholder="Transaction ID, Buyer, Farmer..." />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Transaction ID <FontAwesomeIcon icon={faSort} /></th>
              <th>Buyer <FontAwesomeIcon icon={faSort} /></th>
              <th>Farmer <FontAwesomeIcon icon={faSort} /></th>
              <th>Product <FontAwesomeIcon icon={faSort} /></th>
              <th>Amount <FontAwesomeIcon icon={faSort} /></th>
              <th>Date <FontAwesomeIcon icon={faSort} /></th>
              <th>Status <FontAwesomeIcon icon={faSort} /></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(txn => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td>{txn.buyer}</td>
                <td>{txn.farmer}</td>
                <td>{txn.product}</td>
                <td>{txn.amount}</td>
                <td>{txn.date}</td>
                <td>
                  <span className={`${styles.status} ${txn.status === "Completed" ? styles.completed : styles.pending}`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.btnOutline}`}>
          <FontAwesomeIcon icon={faPrint} /> Print Report
        </button>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleDownload}>
          <FontAwesomeIcon icon={faDownload} /> Download Report
        </button>
      </div>
    </div>
    </div>
  );
};

export default Transactions;

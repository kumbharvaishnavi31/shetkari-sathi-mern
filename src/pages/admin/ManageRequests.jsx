
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ManageRequests.module.css";
import AdminHeader from "../../components/AdminHeader";

const ManageRequest = () => {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  // Fetch all purchase requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/purchase_requests/admin"
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
        alert("Failed to fetch requests");
      }
    };
    fetchRequests();
  }, []);

  // Toggle select all
  const toggleSelectAll = (e) => {
    if (e.target.checked) setSelected(requests.map((r) => r._id));
    else setSelected([]);
  };

  // Toggle individual selection
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Update single request
  const updateStatus = async (request, status) => {
    if (!request.crop?.farmer) return alert("Cannot find farmer for this request");

    try {
      await axios.put(
        `http://localhost:5000/api/purchase_requests/admin/${request._id}`,
        {
          adminStatus: status,
          farmer: request.crop.farmer, // assign farmer from crop
        }
      );

      setRequests((prev) => prev.filter((r) => r._id !== request._id));
      alert(`Request ${status.toLowerCase()} successfully`);
    } catch (err) {
      console.error("Failed to update request:", err);
      alert("Failed to update request");
    }
  };

  // Bulk approve/reject
  const bulkUpdateStatus = async (status) => {
    if (!selected.length) return alert("Select at least one request.");

    try {
      await Promise.all(
        selected.map((id) => {
          const req = requests.find((r) => r._id === id);
          if (!req?.crop?.farmer) throw new Error("Farmer not found for a request");
          return axios.put(
            `http://localhost:5000/api/purchase_requests/admin/${id}`,
            { adminStatus: status, farmer: req.crop.farmer }
          );
        })
      );

      setRequests((prev) => prev.filter((r) => !selected.includes(r._id)));
      alert(`${status} ${selected.length} request(s)`);
      setSelected([]);
    } catch (err) {
      console.error("Bulk update failed:", err.message);
      alert("Failed to update requests");
    }
  };

  // Filter requests
  const filteredRequests = requests.filter(
    (r) =>
      r.buyer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.crop?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AdminHeader />
      <div className={styles.container}>
        <header className={styles.req}>
          <h2 >
            <i className="fas fa-file-alt"></i> Manage Buyer Purchase Requests
          </h2>
          <div className={styles.headerControls}>
            <div className={styles.searchBox}>
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search requests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className={styles.bulk}>
          <div className={styles.bulkControls}>
            <input
              type="checkbox"
              onChange={toggleSelectAll}
              checked={selected.length === requests.length && requests.length > 0}
            />
            <span className={styles.selectAll}>Select All</span>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <textarea
              placeholder="Optional admin message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className={styles.btnSuccess}
              onClick={() => bulkUpdateStatus("Approved")}
            >
              Approve Selected
            </button>
            <button
              className={styles.btnDanger}
              onClick={() => bulkUpdateStatus("Rejected")}
            >
              Reject Selected
            </button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>Request ID</th>
              <th>Buyer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((r) => (
              <tr key={r._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(r._id)}
                    onChange={() => toggleSelect(r._id)}
                  />
                </td>
                <td>#{r._id.slice(-6)}</td>
                <td>{r.buyer?.name || r.buyer}</td>
                <td>{r.crop?.name || r.crop}</td>
                <td>{r.quantity}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${r.adminStatus === "Pending"
                        ? styles.statusPending
                        : r.adminStatus === "Approved"
                          ? styles.statusApproved
                          : styles.statusRejected
                      }`}
                  >
                    {r.adminStatus}
                  </span>
                </td>
                <td className={styles.actions}>
                  <button
                    className="approve"
                    onClick={() => updateStatus(r, "Approved")}
                  >
                    <i className="fas fa-check"></i> Accept
                  </button>
                  <button
                    className="reject"
                    onClick={() => updateStatus(r, "Rejected")}
                  >
                    <i className="fas fa-times"></i> Reject
                  </button>
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No requests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequest;

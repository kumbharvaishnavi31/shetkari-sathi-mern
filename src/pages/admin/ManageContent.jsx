
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ManageContent.module.css";
import AdminHeader from "../../components/AdminHeader";

export default function ManageContent() {
  const [activeTab, setActiveTab] = useState("tips");
  const [tips, setTips] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [market, setMarket] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const BASE = "http://localhost:5000/api";

  // fetch all three collections
  const fetchAll = async () => {
    try {
      const [tipsRes, schemesRes, marketRes] = await Promise.all([
        axios.get(`${BASE}/tips`),
        axios.get(`${BASE}/schemes`),
        axios.get(`${BASE}/market`),
      ]);
      setTips(Array.isArray(tipsRes.data) ? tipsRes.data : []);
      setSchemes(Array.isArray(schemesRes.data) ? schemesRes.data : []);
      setMarket(Array.isArray(marketRes.data) ? marketRes.data : []);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message || err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "";
      if (activeTab === "tips") url = `${BASE}/tips`;
      if (activeTab === "schemes") url = `${BASE}/schemes`;
      if (activeTab === "market") url = `${BASE}/market`;

      // prepare payload
      let payload = { ...formData };

      // convert comma strings to arrays for tip arrays
      if (activeTab === "tips") {
        payload.causes = formData.causes
          ? formData.causes.split(",").map((s) => s.trim()).filter(Boolean)
          : [];
        payload.chemical = formData.chemical
          ? formData.chemical.split(",").map((s) => s.trim()).filter(Boolean)
          : [];
        payload.organic = formData.organic
          ? formData.organic.split(",").map((s) => s.trim()).filter(Boolean)
          : [];
      }

      if (editingId) {
        // PUT to update
        const res = await axios.put(`${url}/${editingId}`, payload);
        console.log("Update response:", res.data);
        alert("✅ Updated successfully!");
      } else {
        const res = await axios.post(url, payload);
        console.log("Create response:", res.data);
        alert("✅ Added successfully!");
      }

      // reset & refresh
      setFormData({});
      setEditingId(null);
      await fetchAll();
    } catch (err) {
      // show helpful error
      console.error("Save error:", err.response?.data || err.message || err);
      const serverMsg = err.response?.data?.message || err.response?.data || err.message;
      alert("Something went wrong while saving data!\n\n" + String(serverMsg));
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Delete this entry?")) return;
    try {
      let url = `${BASE}/${type}`;
      await axios.delete(`${url}/${id}`);
      alert("Deleted");
      await fetchAll();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message || err);
      alert("Delete failed: " + String(err.response?.data || err.message));
    }
  };

  const handleEdit = (item) => {
    // Convert arrays to comma string for tips
    const copy = { ...item };
    if (copy.causes && Array.isArray(copy.causes)) copy.causes = copy.causes.join(", ");
    if (copy.chemical && Array.isArray(copy.chemical)) copy.chemical = copy.chemical.join(", ");
    if (copy.organic && Array.isArray(copy.organic)) copy.organic = copy.organic.join(", ");
    setFormData(copy);
    setEditingId(item._id);
    // ensure the correct tab is active
    if (item.title || item.causes) setActiveTab("tips");
    else if (item.name || item.benefits) setActiveTab("schemes");
    else setActiveTab("market");
  };

  const renderForm = () => {
    switch (activeTab) {
      case "tips":
        return (
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Category</label>
              <input name="category" value={formData.category || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Title</label>
              <input name="title" value={formData.title || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Problem</label>
              <textarea name="problem" value={formData.problem || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Causes (comma separated)</label>
              <input name="causes" value={formData.causes || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Chemical (comma separated)</label>
              <input name="chemical" value={formData.chemical || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Organic (comma separated)</label>
              <input name="organic" value={formData.organic || ""} onChange={handleChange} />
            </div>
          </div>
        );
      case "schemes":
        return (
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Scheme Name</label>
              <input name="name" value={formData.name || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Benefits</label>
              <textarea name="benefits" value={formData.benefits || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Documents</label>
              <textarea name="documents" value={formData.documents || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Start Date</label>
              <input name="startDate" value={formData.startDate || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>End Date</label>
              <input name="endDate" value={formData.endDate || ""} onChange={handleChange} />
            </div>
          </div>
        );
      case "market":
        return (
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Crop</label>
              <input name="crop" value={formData.crop || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>State</label>
              <input name="state" value={formData.state || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>District</label>
              <input name="district" value={formData.district || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Market</label>
              <input name="market" value={formData.market || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Min Price</label>
              <input type="number" name="min" value={formData.min || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Avg Price</label>
              <input type="number" name="avg" value={formData.avg || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Max Price</label>
              <input type="number" name="max" value={formData.max || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Modal Price</label>
              <input type="number" name="modal" value={formData.modal || ""} onChange={handleChange} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderTable = (data, type) => {
    if (!Array.isArray(data) || data.length === 0)
      return <p style={{ textAlign: "center" }}>No data available</p>;

    return (
      <div className={styles.listView}>
        <h3><i className="fas fa-list" /> {type.charAt(0).toUpperCase() + type.slice(1)} List</h3>
        <table>
          <thead>
            <tr>
              <th>Title / Name</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.title || item.name || item.crop}</td>
                <td>{item.problem || item.benefits || item.market || "—"}</td>
                <td className={styles.actionButtons}>
                  <button className={styles.editBtn} onClick={() => handleEdit(item)}>Edit</button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(typeMap(type), item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const typeMap = (listType) => {
    // unify naming (your backend route names)
    if (listType === "tips") return "tips";
    if (listType === "schemes") return "schemes";
    return "market";
  };

  return (
    <>
      <AdminHeader />
      <div className={styles.container}>
        <div className={styles.head}>
          <h2>Manage Content</h2>
          <p className={styles.subtitle}>Add, edit, or delete portal content</p>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <div className={`${styles.tab} ${activeTab === "tips" ? styles.active : ""}`} onClick={() => { setActiveTab("tips"); setFormData({}); setEditingId(null); }}>Tips</div>
            <div className={`${styles.tab} ${activeTab === "schemes" ? styles.active : ""}`} onClick={() => { setActiveTab("schemes"); setFormData({}); setEditingId(null); }}>Schemes</div>
            <div className={`${styles.tab} ${activeTab === "market" ? styles.active : ""}`} onClick={() => { setActiveTab("market"); setFormData({}); setEditingId(null); }}>Market</div>
          </div>

          <div className={`${styles.tabContent} ${styles.active}`}>
            <form onSubmit={handleSubmit}>
              {renderForm()}
              <div className={styles.formActions}>
                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>{editingId ? "Update" : "Add"}</button>
                <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={() => { setFormData({}); setEditingId(null); }}>Clear</button>
              </div>
            </form>
          </div>
        </div>

        {activeTab === "tips" && renderTable(tips, "tips")}
        {activeTab === "schemes" && renderTable(schemes, "schemes")}
        {activeTab === "market" && renderTable(market, "market")}
      </div>
    </>
  );
}

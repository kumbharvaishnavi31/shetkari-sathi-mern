
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ManageCrops.module.css";
import AdminHeader from "../../components/AdminHeader";

const ManageCrops = () => {
  const [crops, setCrops] = useState([]);
  const [selected, setSelected] = useState([]);
  const [category, setCategory] = useState("");

  // Fetch crops from backend
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/crops");
        setCrops(res.data);
      } catch (err) {
        console.error("Error fetching crops:", err);
      }
    };
    fetchCrops();
  }, []);

  const toggleSelectAll = (e) => {
    if (e.target.checked) setSelected(crops.map((c) => c._id));
    else setSelected([]);
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Assign category to selected crops
  const assignCategory = async () => {
    if (!category) return alert("Select a category first");
    if (!selected.length) return alert("No crops selected");

    try {
      await Promise.all(
        selected.map((id) =>
          axios.put(`http://localhost:5000/api/crops/${id}`, { category })
        )
      );
      alert(`Assigned category "${category}" to ${selected.length} crops.`);
      // Refresh crop list
      const res = await axios.get("http://localhost:5000/api/crops");
      setCrops(res.data);
      setSelected([]);
    } catch (err) {
      console.error(err);
      alert("Failed to assign category.");
    }
  };

  // Approve crop
  const approveCrop = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/crops/approve/${id}`);
      setCrops((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: "Approved" } : c))
      );
      alert("Crop approved successfully!");

    } catch (err) {
      console.error(err);
      alert("Failed to approve crop.");
    }
  };

  //delete crop
  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this crop?")) return;
  
  try {
    const response = await fetch(`http://localhost:5000/api/crops/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Crop deleted successfully");
      setCrops(crops.filter((c) => c._id !== id)); // remove from UI
    } else {
      const data = await response.json();
      alert("Failed to delete: " + data.message);
    }
  } catch (err) {
    console.error("Error deleting crop:", err);
    alert("Something went wrong while deleting crop.");
  }
};


  return (
    <div>
      <AdminHeader />
      <div className={styles.container}>
        <div className={styles.head}><h1><i className="fas fa-leaf "></i>Manage Crops</h1>
</div>
        <div className={styles.actions}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="vegetable">Vegetable</option>
            <option value="fruit">Fruit</option>
            <option value="grain">Grain</option>
            <option value="legume">Legume</option>
          </select>
          <button onClick={assignCategory}>Assign Category</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={selected.length === crops.length && crops.length > 0}
                />
              </th>
              <th>Farmerid</th>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((c) => (
              <tr key={c._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(c._id)}
                    onChange={() => toggleSelect(c._id)}
                  />
                </td>
                <td>{c.farmer}</td>
                {/* <td>{c.farmer?.name || "Unknown"}</td> */}
                <td>{c.name}</td>
                <td>{c.type}</td>
                <td>{c.price}</td>
                <td>{c.quantity}</td>
                <td>{c.status || "Pending"}</td>
               
                <td>
  <div className="button-group">
    <button onClick={() => approveCrop(c._id)} className="approve-btn">
      Approve
    </button>
    <button onClick={() => handleDelete(c._id)} className="delete-btn">
      Delete
    </button>
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCrops;


import React, { useEffect, useState } from "react";
import styles from "./MyProducts.module.css";
import FarmerHeader from "../../components/FarmerHeader";
import axios from "axios";

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const farmerId = storedUser?.userId; // logged-in farmer

  // Fetch farmer's crops
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/crops/farmer/${farmerId}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        alert("Failed to fetch products");
      }
    };
    if (farmerId) fetchProducts();
  }, [farmerId]);

  // Delete crop
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/crops/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Crop deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete crop");
    }
  };

  // Edit crop
  const handleEdit = async (product) => {
    const newPrice = prompt("Enter new price:", product.price);
    const newQuantity = prompt("Enter new quantity:", product.quantity);
    if (newPrice == null || newQuantity == null) return;

    try {
      const res = await axios.put(`http://localhost:5000/api/crops/${product._id}`, {
        price: Number(newPrice),
        quantity: Number(newQuantity),
      });

      setProducts((prev) =>
        prev.map((p) => (p._id === product._id ? res.data : p))
      );
      alert("Crop updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update crop");
    }
  };

  return (
    <>
      <FarmerHeader />
      <div className={styles.container}>
        <h1>My Products</h1>

        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className={product.featured ? styles.featured : ""}>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.status || "Active"}</td>
                  <td>
                    <button className={styles.editBtn} onClick={() => handleEdit(product)}>
                      Edit
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyProducts;

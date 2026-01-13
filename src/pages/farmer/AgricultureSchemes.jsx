
import React, { useState, useEffect } from "react";
import FarmerHeader from "../../components/FarmerHeader";
import styles from "./AgricultureSchemes.module.css";
import axios from "axios";

const AgricultureSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        // Fetch data from MongoDB via backend API
        const response = await axios.get("http://localhost:5000/api/schemes");
        setSchemes(response.data);
      } catch (error) {
        console.error("❌ Error fetching schemes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (loading) {
    return (
      <div className={styles.body}>
        <FarmerHeader />
        <p style={{ textAlign: "center", marginTop: "100px" }}>
          Loading schemes...
        </p>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <FarmerHeader />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Maharashtra – Agriculture Related Government Schemes
        </h1>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Scheme Name</th>
                <th>Benefits</th>
                <th>Documents Required</th>
                <th>Registration Start Date</th>
                <th>Last Date to Apply</th>
              </tr>
            </thead>
            <tbody>
              {schemes.length > 0 ? (
                schemes.map((scheme, index) => (
                  <tr key={index}>
                    <td>{scheme.name}</td>
                    <td>{scheme.benefits}</td>
                    <td>{scheme.documents}</td>
                    <td>{scheme.startDate || "—"}</td>
                    <td>{scheme.endDate || "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "#777" }}>
                    No schemes available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgricultureSchemes;

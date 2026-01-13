import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MarketPrice.module.css";
import BuyerHeader from "../../components/BuyerHeader";

export default function MarketPrice() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      // Fetch only Maharashtra data
      const response = await axios.get("http://localhost:5000/api/market");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching market prices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const filteredData = data.filter((item) =>
    selectedCrop === "" ? true : item.crop.toLowerCase().includes(selectedCrop.toLowerCase())
  );

  return (
    <div className="market-page">
      <BuyerHeader />
      <header className="header">
        <h1>🌾 Market Prices (Maharashtra)</h1>
        <p>Latest government market prices of various crops.</p>
      </header>

      <div className="filter-section">
        <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="crop">Select Crop:</label>
          <select
            id="crop"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            <option value="">All Crops</option>
            {[...new Set(data.map((item) => item.crop))].map((crop) => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </form>
      </div>

      <div className="table-container">
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading data...</p>
        ) : (
          <table className="price-table">
            <thead>
              <tr>
                <th>Crop</th>
                <th>State</th>
                <th>District</th>
                <th>Market</th>
                <th>Min (₹/qtl)</th>
                <th>Max (₹/qtl)</th>
                <th>Modal (₹/qtl)</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={`${item._id}`}>
                    <td>{item.crop}</td>
                    <td>{item.state}</td>
                    <td>{item.district}</td>
                    <td>{item.market}</td>
                    <td>{item.min}</td>
                    <td>{item.max}</td>
                    <td>{item.avg}</td>
                    <td>{item.unit}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", color: "#777" }}>
                    No crops found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
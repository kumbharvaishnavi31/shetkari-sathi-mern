
import React, { useState, useEffect } from "react";
import axios from "axios";
import FarmerHeader from "../../components/FarmerHeader";
import styles from "./CropSolutions.module.css";

const CropSolutions = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cropProblems, setCropProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tips");
        setCropProblems(res.data);
      } catch (err) {
        console.error("Error fetching crop problems:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTips();
  }, []);

  const filteredProblems = cropProblems.filter((problem) => {
    const matchesFilter = filter === "all" || problem.category === filter;
    const matchesSearch =
      problem.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.problem?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <p>🌾 Loading crop problems...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <FarmerHeader />

      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>🌱 Crop Problem Solutions Guide</h1>
          <p className={styles.subtitle}>
            Complete information on causes, chemical solutions, and organic remedies for common crop problems
          </p>
        </header>

        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search for specific problems or crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.filters}>
            <button
              className={`${styles["filter-btn"]} ${filter === "all" ? styles.active : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`${styles["filter-btn"]} ${filter === "disease" ? styles.active : ""}`}
              onClick={() => setFilter("disease")}
            >
              Diseases
            </button>
            <button
              className={`${styles["filter-btn"]} ${filter === "pest" ? styles.active : ""}`}
              onClick={() => setFilter("pest")}
            >
              Pests
            </button>
            <button
              className={`${styles["filter-btn"]} ${filter === "deficiency" ? styles.active : ""}`}
              onClick={() => setFilter("deficiency")}
            >
              Deficiencies
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {filteredProblems.length > 0 ? (
            filteredProblems.map((p, idx) => (
              <div className={styles.card} key={p._id || idx}>
                <div className={`${styles.cardHeader} ${styles[p.category]}`}>
                  <h2>{p.title}</h2>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.problemTitle}>{p.problem}</div>

                  {p.causes?.length > 0 && (
                    <div className={styles.section}>
                      <div className={styles.sectionTitle}>Causes</div>
                      <ul className={styles.causes}>
                        {p.causes.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {p.chemical?.length > 0 && (
                    <div className={styles.section}>
                      <div className={styles.sectionTitle}>Chemical Solutions</div>
                      <ul className={styles.chemicalSolution}>
                        {p.chemical.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {p.organic?.length > 0 && (
                    <div className={styles.section}>
                      <div className={styles.sectionTitle}>Organic Solutions</div>
                      <ul className={styles.organicSolution}>
                        {p.organic.map((o, i) => (
                          <li key={i}>{o}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noData}>No problems found.</p>
          )}
        </div>

        <div className={styles.warning}>
          <p>
            <strong>Important:</strong> Always follow product label instructions when using chemical
            solutions. Wear protective equipment and observe recommended waiting periods between
            application and harvest. Organic solutions are generally safer but should still be used
            according to recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CropSolutions;

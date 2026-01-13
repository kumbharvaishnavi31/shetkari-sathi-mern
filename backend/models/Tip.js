// import { useState } from "react";
// import styles from "./ManageContent.module.css";
// import AdminHeader from "../../components/AdminHeader";
// const ManageContent = () => {
//   const [activeTab, setActiveTab] = useState("tips");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [previewContent, setPreviewContent] = useState("");

//   const switchTab = (tab) => {
//     setActiveTab(tab);
//   };

//   const handlePreview = (e) => {
//     e.preventDefault();
//     const form = e.target.closest("form");
//     const labels = form.querySelectorAll("label");
//     const inputs = form.querySelectorAll(
//       'input[type="text"], textarea, select'
//     );
//     let html = "";

//     inputs.forEach((input, index) => {
//       if (input.value) {
//         const label = labels[index]
//           ? labels[index].textContent
//           : input.placeholder;
//         html += `
//           <div class="${styles.previewItem}">
//             <div class="${styles.previewLabel}">${label}</div>
//             <div class="${styles.previewValue}">${input.value}</div>
//           </div>
//         `;
//       }
//     });

//     setPreviewContent(
//       html || "<p class='" + styles.previewValue + "'>No content to preview. Please fill out the form.</p>"
//     );
//     setModalVisible(true);
//   };

//   return (
//     <div>
//         <AdminHeader/>
//     <div className={styles.container}>
//       <div className={styles.head}>
//         <h2>
//           <i className="fas fa-seedling"></i> Manage Portal Content
//         </h2>
//         <p className={styles.subtitle}>
//           Add and manage farming tips, government schemes, and market prices
//           for the AgroConnect portal
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className={styles.tabsContainer}>
//         <div className={styles.tabs}>
//           <div
//             className={`${styles.tab} ${activeTab === "tips" ? styles.active : ""}`}
//             onClick={() => switchTab("tips")}
//           >
//             <i className="fas fa-lightbulb"></i> Farming Tips
//           </div>
//           <div
//             className={`${styles.tab} ${activeTab === "schemes" ? styles.active : ""}`}
//             onClick={() => switchTab("schemes")}
//           >
//             <i className="fas fa-file-invoice-dollar"></i> Govt Schemes
//           </div>
//           <div
//             className={`${styles.tab} ${activeTab === "prices" ? styles.active : ""}`}
//             onClick={() => switchTab("prices")}
//           >
//             <i className="fas fa-chart-line"></i> Market Prices
//           </div>
//         </div>

//         {/* Tab Contents */}
//         {/* Farming Tips */}
//         <div
//           className={`${styles.tabContent} ${
//             activeTab === "tips" ? styles.active : ""
//           }`}
//         >
//           <form>
//             <div className={styles.formGrid}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="tip-title">
//                   <i className="fas fa-heading"></i> Tip Title
//                 </label>
//                 <input type="text" id="tip-title" placeholder="Enter tip title" />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="tip-cause">
//                   <i className="fas fa-exclamation-circle"></i> Cause
//                 </label>
//                 <input type="text" id="tip-cause" placeholder="Enter cause" />
//               </div>
//               <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
//                 <label htmlFor="tip-details">
//                   <i className="fas fa-align-left"></i> Tip Details
//                 </label>
//                 <textarea id="tip-details" placeholder="Enter detailed description" />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="chemical-solution">
//                   <i className="fas fa-flask"></i> Chemical Solution
//                 </label>
//                 <input type="text" id="chemical-solution" placeholder="Enter chemical solution" />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="organic-solution">
//                   <i className="fas fa-leaf"></i> Organic Solution
//                 </label>
//                 <input type="text" id="organic-solution" placeholder="Enter organic solution" />
//               </div>
//             </div>

//             <div className={styles.formActions}>
//               <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={handlePreview}>
//                 <i className="fas fa-eye"></i> Preview
//               </button>
//               <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
//                 <i className="fas fa-save"></i> Save Tip
//               </button>
//             </div>
//           </form>

//           {/* Existing Tips Table */}
//           <div className={styles.listView}>
//             <h3>
//               <i className="fas fa-list"></i> Existing Tips
//             </h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Date Added</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Soil Preparation Basics</td>
//                   <td>Aug 12, 2023</td>
//                   <td>
//                     <div className={styles.actionButtons}>
//                       <button className={styles.editBtn}><i className="fas fa-edit"></i> Edit</button>
//                       <button className={styles.deleteBtn}><i className="fas fa-trash"></i> Delete</button>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Water Conservation Techniques</td>
//                   <td>Jul 28, 2023</td>
//                   <td>
//                     <div className={styles.actionButtons}>
//                       <button className={styles.editBtn}><i className="fas fa-edit"></i> Edit</button>
//                       <button className={styles.deleteBtn}><i className="fas fa-trash"></i> Delete</button>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Govt Schemes */}
//         <div
//           className={`${styles.tabContent} ${
//             activeTab === "schemes" ? styles.active : ""
//           }`}
//         >
//           <form>
//             <div className={styles.formGrid}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="scheme-name">
//                   <i className="fas fa-tag"></i> Scheme Name
//                 </label>
//                 <input type="text" id="scheme-name" placeholder="Enter scheme name" />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="start-date">
//                   <i className="fas fa-calendar-alt"></i> Registration Start Date
//                 </label>
//                 <input type="text" id="start-date" placeholder="DD/MM/YYYY" />
//               </div>
//               <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
//                 <label htmlFor="scheme-benefits">
//                   <i className="fas fa-gift"></i> Benefits
//                 </label>
//                 <textarea id="scheme-benefits" placeholder="List the benefits of this scheme" />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="end-date">
//                   <i className="fas fa-calendar-times"></i> Last Date to Apply
//                 </label>
//                 <input type="text" id="end-date" placeholder="DD/MM/YYYY" />
//               </div>
//               <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
//                 <label htmlFor="documents">
//                   <i className="fas fa-file-alt"></i> Documents Required
//                 </label>
//                 <textarea id="documents" placeholder="List required documents" />
//               </div>
//             </div>

//             <div className={styles.formActions}>
//               <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={handlePreview}>
//                 <i className="fas fa-eye"></i> Preview
//               </button>
//               <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
//                 <i className="fas fa-save"></i> Save Scheme
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Market Prices */}
//         <div
//           className={`${styles.tabContent} ${
//             activeTab === "prices" ? styles.active : ""
//           }`}
//         >
//           <form>
//             <div className={styles.formGrid}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="crop-name">
//                   <i className="fas fa-seedling"></i> Crop Name
//                 </label>
//                 <input type="text" id="crop-name" placeholder="Enter crop name" />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="min-price">
//                   <i className="fas fa-arrow-down"></i> Minimum Price
//                 </label>
//                 <input type="text" id="min-price" placeholder="Enter minimum price" />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="max-price">
//                   <i className="fas fa-arrow-up"></i> Maximum Price
//                 </label>
//                 <input type="text" id="max-price" placeholder="Enter maximum price" />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="avg-price">
//                   <i className="fas fa-balance-scale"></i> Average Price
//                 </label>
//                 <input type="text" id="avg-price" placeholder="Enter average price" />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="price-unit">
//                   <i className="fas fa-weight-hanging"></i> Unit
//                 </label>
//                 <select id="price-unit">
//                   <option value="">Select unit</option>
//                   <option value="kg">Per Kg</option>
//                   <option value="quintal">Per Quintal</option>
//                   <option value="ton">Per Ton</option>
//                 </select>
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="market">
//                   <i className="fas fa-store"></i> Market
//                 </label>
//                 <input type="text" id="market" placeholder="Enter market name" />
//               </div>
//             </div>

//             <div className={styles.formActions}>
//               <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={handlePreview}>
//                 <i className="fas fa-eye"></i> Preview
//               </button>
//               <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
//                 <i className="fas fa-save"></i> Save Price
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Preview Modal */}
//       {modalVisible && (
//         <div className={styles.modal} onClick={() => setModalVisible(false)}>
//           <div
//             className={styles.modalContent}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className={styles.modalHeader}>
//               <h3 className={styles.modalTitle}>
//                 <i className="fas fa-file-alt"></i> Content Preview
//               </h3>
//               <button
//                 className={styles.modalClose}
//                 onClick={() => setModalVisible(false)}
//               >
//                 &times;
//               </button>
//             </div>
//             <div
//               id="previewBody"
//               dangerouslySetInnerHTML={{ __html: previewContent }}
//             ></div>
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default ManageContent;
import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  problem: String,
  causes: [String],
  chemical: [String],
  organic: [String],
}, { timestamps: true });

export default mongoose.model("Tip", tipSchema);

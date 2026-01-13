
import React, { useEffect, useState } from "react";
import styles from "./ManageUsers.module.css";
import AdminHeader from "../../components/AdminHeader";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        alert("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleSelectAll = (e) => {
    const checked = e.target.checked;
    document
      .querySelectorAll(`input[name="user"]`)
      .forEach((box) => (box.checked = checked));
  };

  const bulkAction = (status) => {
    const selected = [...document.querySelectorAll('input[name="user"]:checked')];
    if (selected.length === 0) {
      alert("Please select at least one user.");
      return;
    }
    const actionText =
      status === "active"
        ? "activate"
        : status === "inactive"
        ? "deactivate"
        : "export";
    if (status === "export") {
      alert(`Exported ${selected.length} user(s) as CSV.`);
      return;
    }
    if (
      window.confirm(`Are you sure you want to ${actionText} ${selected.length} user(s)?`)
    ) {
      alert(
        `${actionText.charAt(0).toUpperCase() + actionText.slice(1)}d ${
          selected.length
        } user(s).`
      );
    }
  };

  const handleActionClick = (e, type, user) => {
    e.preventDefault();
    if (type === "edit") {
      alert(`Edit user: ${user.name} (ID: ${user._id})`);
    } else if (type === "delete") {
      if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
        axios
          .delete(`http://localhost:5000/api/users/${user._id}`)
          .then(() => {
            setUsers((prev) => prev.filter((u) => u._id !== user._id));
            alert("User deleted successfully");
          })
          .catch((err) => {
            console.error(err);
            alert("Failed to delete user");
          });
      }
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <header className={styles.mhead}>
            <h2>
              <i className="fas fa-users"></i> Manage Users
            </h2>
            <div className={styles["header-controls"]}>
              <div className={styles["search-box"]}>
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search users..." />
              </div>
              <button className={styles["filter-btn"]}>
                <i className="fas fa-filter"></i> Filters
              </button>
            </div>
          </header>

          <div className={styles.bulk}>
            <div className={styles["bulk-controls"]}>
              <input type="checkbox" id="selectAll" onChange={toggleSelectAll} />
              <span className={styles["select-all"]}>Select All</span>
            </div>
            <div className={styles["bulk-actions"]}>
              <button
                className={`${styles.btn} ${styles["btn-success"]}`}
                onClick={() => bulkAction("active")}
              >
                <i className="fas fa-user-check"></i> Activate Selected
              </button>
              <button
                className={`${styles.btn} ${styles["btn-danger"]}`}
                onClick={() => bulkAction("inactive")}
              >
                <i className="fas fa-user-slash"></i> Deactivate Selected
              </button>
              <button
                className={styles.btn}
                style={{ background: "#f57c00" }}
                onClick={() => bulkAction("export")}
              >
                <i className="fas fa-download"></i> Export Selected
              </button>
            </div>
          </div>

          {loading ? (
            <p style={{ textAlign: "center" }}>Loading users...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>
                        <input type="checkbox" name="user" />
                      </td>
                      <td>{index + 1}</td>
                      <td>
                        {user.name}
                        <div className={styles["user-role"]}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`${styles["status-badge"]} ${
                            styles["status-active"]
                          }`}
                        >
                          Active
                        </span>
                      </td>
                      <td className={styles.actions}>
                        <a href="#" onClick={(e) => handleActionClick(e, "edit", user)}>
                          <i className="fas fa-edit"></i> Edit
                        </a>
                        <a href="#" onClick={(e) => handleActionClick(e, "delete", user)}>
                          <i className="fas fa-trash"></i> Delete
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;

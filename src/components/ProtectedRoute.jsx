
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// role: optional, pass "farmer", "buyer", or "admin"
const ProtectedRoute = ({ children, role }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      setAllowed(false);
    } else {
      const user = JSON.parse(userData);
      if (role && user.role !== role) {
        setAllowed(false);
      } else {
        setAllowed(true);
      }
    }

    setLoading(false);
  }, [role]);

  if (loading) return <div style={{textAlign: "center", marginTop: "50px"}}>Loading...</div>;
  if (!allowed) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;

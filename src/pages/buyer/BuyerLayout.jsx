// src/components/BuyerLayout.jsx
import React from "react";
import BuyerHeader from "./BuyerHeader";

export default function BuyerLayout({ children }) {
  return (
    <div className="buyer-layout">
      <BuyerHeader />
      <div className="buyer-content">{children}</div>
    </div>
  );
}

// src/Components/OKR/OKRList.jsx

import React from "react";
import OKRCard from "./OKRCard";

const OKRList = ({ okrs }) => {
  return (
    <div className="space-y-6">
      {okrs.map((okr, index) => (
        <OKRCard key={index} okr={okr} />
      ))}
    </div>
  );
};

export default OKRList;

// src/Components/OKR/OKRStats.jsx

import React from "react";

const OKRStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="border border-[#1E2235] bg-[#10111C] rounded-md p-3"
        >
          <h1 className={`text-xl font-bold ${item.color}`}>
            {item.value}
          </h1>

          <p className="text-gray-400 mt-2 text-md">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OKRStats;
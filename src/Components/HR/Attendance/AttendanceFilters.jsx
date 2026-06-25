import React, { useState } from "react";
import { Download } from "lucide-react";

const AttendanceFilters = () => {
  const [activeTab, setActiveTab] = useState("week");

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab("week")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all
            ${
              activeTab === "week"
                ? "bg-white text-black"
                : "bg-[#13141F] border border-[#1A2035] text-white hover:border-indigo-500"
            }`}
        >
          This Week
        </button>

        <button
          onClick={() => setActiveTab("month")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all
            ${
              activeTab === "month"
                ? "bg-white text-black"
                : "bg-[#13141F] border border-[#1A2035] text-white hover:border-indigo-500"
            }`}
        >
          This Month
        </button>

        <button
          onClick={() => setActiveTab("last")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all
            ${
              activeTab === "last"
                ? "bg-white text-black"
                : "bg-[#13141F] border border-[#1A2035] text-white hover:border-indigo-500"
            }`}
        >
          Last Month
        </button>
      </div>

      {/* Export Button */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-[#1A2035] bg-[#13141F] hover:border-indigo-500 text-sm transition-all">
        <Download size={15} />
        Export CSV
      </button>
    </div>
  );
};

export default AttendanceFilters;
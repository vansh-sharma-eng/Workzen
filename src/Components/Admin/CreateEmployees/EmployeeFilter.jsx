import React from "react";
import { Grid2x2, CodeXml, Brush, ChartColumnIncreasing, Settings } from "lucide-react";

const EmployeeFilter = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { label: "All", icon: <Grid2x2 size={14} /> },
    { label: "Engineering", icon: <CodeXml size={14} /> },
    { label: "Design", icon: <Brush size={14} /> },
    { label: "Sales", icon: <ChartColumnIncreasing size={14} /> },
    { label: "Operations", icon: <Settings size={14} /> },
  ];

  return (
    <div className="px-7  flex items-center gap-4 p-4 text-[#93c5fd]">
      {filters.map((filter) => (
        <button
          key={filter.label}
          onClick={() => setActiveFilter(filter.label)}
          className={`flex items-center gap-2 rounded-md border px-4 py-2 text-xs font-medium transition-all
            ${
              activeFilter === filter.label
                ? "border-[#3b82f6] bg-[#0d0f14] text-[#60a5fa]"
                : "border-[#1e2333] bg-transparent text-[#93c5fd] hover:bg-[#151822]"
            }`}
        >
          {filter.icon}
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default EmployeeFilter;
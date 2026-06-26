import React from "react";

const tabs = ["All", "Info", "Important", "Urgent"];

const AnnouncementFilters = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="p-2">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
              activeFilter === tab
                ? "bg-white text-black"
                : "bg-[#14151c] border border-[#272727] text-gray-400 hover:text-white hover:border-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementFilters;
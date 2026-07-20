import React from "react";

const LeaveTabs = ({ activeTab, setActiveTab, pendingCount = 0 }) => {
  const tabs = [
    { id: "pending", label: "Pending", count: pendingCount || undefined },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
    { id: "all", label: "All Requests" },
    { id: "calendar", label: "Team Calendar" },
    { id: "policy", label: "Leave Policy" },
  ];

  return (
    <div className="border-b border-[#262626]">
      <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-5 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>{tab.label}</span>

              {tab.count > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#191c28] text-xs text-white">
                  {tab.count}
                </span>
              )}
            </div>

            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-white"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeaveTabs;

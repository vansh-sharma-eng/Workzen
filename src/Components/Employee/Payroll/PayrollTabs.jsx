import React from "react";

const PayrollTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="inline-flex bg-[#10111C] rounded-xl p-1 mb-6">
      {["Payslip", "Salary Breakdown", "History"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-2 rounded-lg text-sm transition-all ${
            activeTab === tab
              ? "bg-[#6366f1] text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default PayrollTabs;
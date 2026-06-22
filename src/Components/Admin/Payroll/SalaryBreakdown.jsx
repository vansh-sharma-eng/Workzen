// src/Components/Payroll/SalaryBreakdown.jsx

import React from "react";

const SalaryBreakdown = ({ data }) => {
  return (
    <div className="border border-[#1E2235] bg-[#10111C] rounded-md h-90 p-6">
      <h2 className="text-white text-md font-bold">
        Salary Breakdown
      </h2>

      <p className="text-gray-400 text-xs mb-4">
        June 2026 components (gross ₹24.55L)
      </p>

      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300 text-xs">
                {item.label}
              </span>

              <span
                className={`font-semibold text-sm ${
                  item.negative
                    ? "text-red-400"
                    : "text-white"
                }`}
              >
                {item.amount}
              </span>
            </div>

            <div className="w-full bg-[#161D35] h-1.5 rounded-full overflow-hidden">
              <div
                className={`${item.color} h-1 rounded-full`}
                style={{
                  width: `${item.percent}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#383838] mt-2 pt-2 flex justify-between">
        <h2 className="text-sm text-[#adadad] font-semibold">
          Net Payable
        </h2>

        <h2 className="text-sm font-bold text-emerald-400">
          ₹21.71L
        </h2>
      </div>
    </div>
  );
};

export default SalaryBreakdown;
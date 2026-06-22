import React from "react";
import { payrollData } from "./payrollData";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const colors = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#06b6d4",
];

const SalaryBreakdown = () => {
  return (
    <div className="grid xl:grid-cols-2 gap-6">
      <div className="bg-[#10111C] border border-[#1E2235] rounded-md p-6  h-[450px]">
        <h2 className="text-white text-xl font-semibold mb-4">
          Earnings Breakdown
        </h2>

        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={payrollData.earnings}
              dataKey="amount"
              innerRadius={70}
              outerRadius={110}
              label
            >
              {payrollData.earnings.map((_, index) => (
                <Cell
                  key={index}
                  fill={colors[index]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#10111C] rounded-xl p-6 border border-slate-800">
        <h2 className="text-white text-xl font-semibold mb-6">
          Deductions Breakdown
        </h2>

        <div className="space-y-8">
          {payrollData.deductions.map((item) => (
            <div key={item.name}>
              <div className="flex justify-between text-white mb-2">
                <span>{item.name}</span>
                <span>
                  ₹{item.amount.toLocaleString()}
                </span>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-pink-500 h-3 rounded-full"
                  style={{
                    width: `${(item.amount / 9000) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalaryBreakdown;
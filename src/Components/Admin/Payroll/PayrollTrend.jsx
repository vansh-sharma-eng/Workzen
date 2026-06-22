// src/Components/Payroll/PayrollTrend.jsx

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Download } from "lucide-react";

const PayrollTrend = ({ data }) => {
  return (
    <div className="border border-[#1E2235] bg-[#10111C] h-90 rounded-md p-6">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 className="text-white text-md font-bold">
            Payroll Trend
          </h2>

          <p className="text-gray-400 text-xs">
            Monthly total (₹)
          </p>
        </div>

        <button className="border border-[#2A314D] px-3 py-1 rounded-md text-gray-300 flex items-center gap-2">
          <Download size={15} />
          Export
        </button>
      </div>

      <div className="h-[250px] -ml-10 ">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="2 2"
              stroke="#1A2138"
            />

            <XAxis
              dataKey="month"
              stroke="#94A3B8"
            />

            <YAxis stroke="#94A3B8" />

            <Tooltip />

            <Bar
              dataKey="payroll"
              radius={[6, 6, 0, 0]}
              fill="#6366F1"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PayrollTrend;
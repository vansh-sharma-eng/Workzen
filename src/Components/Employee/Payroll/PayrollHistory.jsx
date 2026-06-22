import React from "react";
import { payrollData } from "./payrollData";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const PayrollHistory = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#10111C] border border-[#1E2235] p-6 rounded-xl  h-[350px]">
        <h2 className="text-white text-xl font-semibold mb-4">
          6-Month Salary Trend
        </h2>

        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={payrollData.history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              dataKey="net"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#10111C] border border-[#1E2235] rounded-md overflow-hidden">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-4 text-left">Month</th>
              <th className="p-4 text-left">Gross</th>
              <th className="p-4 text-left">Deduction</th>
              <th className="p-4 text-left">Net Pay</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {payrollData.history.map((item) => (
              <tr
                key={item.month}
                className="border-b border-slate-800"
              >
                <td className="p-4">{item.month}</td>
                <td className="p-4">
                  ₹{item.gross.toLocaleString()}
                </td>
                <td className="p-4">
                  ₹{item.deduction.toLocaleString()}
                </td>
                <td className="p-4">
                  ₹{item.net.toLocaleString()}
                </td>
                <td className="p-4">
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollHistory;
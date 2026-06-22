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

const AttendanceChart = ({ data, sidebarCollapsed }) => {
  return (
    <div
      className={`
        transition-all
        duration-300
        ${
          sidebarCollapsed
            ? "ml-0 w-[calc(110%)]"
            : "ml-0 w-[calc(114%)]"
        }
      `}
    >
      <div className="bg-[#10111C] border border-[#20263a] rounded-xl p-5 h-[400px]">
        {/* Header */}
        <h2 className="text-white text-md font-semibold mb-1">
          This Week Attendance Rate
        </h2>

        <p className="text-[#94a3b8] text-sm mb-6">
          Percentage of employees present
        </p>

        {/* Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
              barSize={42}
            >
              <CartesianGrid
                stroke="#1a2235"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={[80, 100]}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#111827",
                  border: "1px solid #1f2937",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Bar
                dataKey="value"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
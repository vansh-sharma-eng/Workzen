import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { departmentMood } from "../../../data/HrData/moodData";

const DepartmentMoodChart = () => {
  return (
    <>
    

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Mood by Department
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Employee wellness distribution across teams
        </p>
      </div>

      {/* Chart */}

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={departmentMood}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid
              stroke="#23293b"
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
              tick={{ fill: "#9CA3AF" }}
              axisLine={{ stroke: "#23293b" }}
              tickLine={false}
            />

            <YAxis
              dataKey="department"
              type="category"
              tick={{ fill: "#9CA3AF", fontSize: 14 }}
              axisLine={{ stroke: "#23293b" }}
              tickLine={false}
              width={70}
            />

            <Tooltip
              contentStyle={{
                background: "#151822",
                border: "1px solid #1e2333",
                borderRadius: "10px",
                color: "#fff",

              }}
            />

            <Legend />
<div className="flex gap-4">
    
            <Bar
              dataKey="great"
              stackId="a"
              fill="#10B981"
              radius={[0, 4, 4, 0]}
              name="Great"
            />

            <Bar
              dataKey="good"
              stackId="a"
              fill="#6366F1"
              name="Good"
            />

            <Bar
              dataKey="okay"
              stackId="a"
              fill="#F59E0B"
              name="Okay"
            />

            <Bar
              dataKey="stressed"
              stackId="a"
              fill="#FB923C"
              name="Stressed"
            />

            <Bar
              dataKey="burnout"
              stackId="a"
              fill="#EF4444"
              radius={[4, 0, 0, 4]}
              name="Burned Out"
            />
</div>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}

      <div className="mt-6 grid grid-cols-3 gap-4">

        <div className="rounded-xl border border-[#1e2333] bg-[#10141f] p-4">
          <p className="text-sm text-gray-400">Happiest Team</p>

          <h3 className=" text-sm font-semibold text-emerald-400">
            Engineering
          </h3>
        </div>

        <div className="rounded-xl border border-[#1e2333] bg-[#10141f] p-4">
          <p className="text-sm text-gray-400">Needs Attention</p>

          <h3 className="text-sm font-semibold text-orange-400">
            Sales
          </h3>
        </div>

        <div className="rounded-xl border border-[#1e2333] bg-[#10141f] p-4">
          <p className="text-sm text-gray-400">Avg Mood Score</p>

          <h3 className="text-sm font-semibold text-blue-400">
            4.2 / 5
          </h3>
        </div>

      </div>
    </>
  );
};

export default DepartmentMoodChart;
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const departmentData = [
  {
    department: "Engineering",
    attendance: 95,
    color: "#6366F1",
  },
  {
    department: "Design",
    attendance: 88,
    color: "#EC4899",
  },
  {
    department: "Marketing",
    attendance: 84,
    color: "#10B981",
  },
  {
    department: "Sales",
    attendance: 79,
    color: "#F59E0B",
  },
  {
    department: "HR",
    attendance: 91,
    color: "#06B6D4",
  },
];

const DepartmentAttendance = () => {
  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-2xl p-6 h-full">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Department Attendance
        </h2>

        <p className="text-xs text-gray-400 ">
          Attendance percentage by department
        </p>
      </div>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={departmentData}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >
            <XAxis
              type="number"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF" }}
            />

            <YAxis
              type="category"
              dataKey="department"
              width={110}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#E5E7EB" }}
            />

            <Tooltip
              formatter={(value) => [`${value}%`, "Attendance"]}
              contentStyle={{
                background: "#13141F",
                border: "1px solid #1A2035",
                borderRadius: "12px",
              }}
            />

            <Bar
              dataKey="attendance"
              radius={[0, 8, 8, 0]}
              barSize={18}
            >
              {departmentData.map((item, index) => (
                <Cell
                  key={index}
                  fill={item.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-6 space-y-3">
        {departmentData.map((dept) => (
          <div
            key={dept.department}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: dept.color,
                }}
              />

              <span className="text-gray-300 text-sm">
                {dept.department}
              </span>
            </div>

            <span className="text-white font-semibold">
              {dept.attendance}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentAttendance;
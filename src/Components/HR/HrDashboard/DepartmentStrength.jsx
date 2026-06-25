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
import { departmentStrength } from "../../../data/HrData/HrdashboardData";
const DepartmentStrength = () => {
  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-md p-5 h-full">
    
      <div className="mb-4">
        <h2 className="text-md font-semibold text-white">
          Department Strength
        </h2>

        <p className="text-gray-400 text-xs">
          Employees across departments
        </p>
      </div>

    
      <div className="h-[300px] ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={departmentStrength}
            layout="vertical"
            margin={{
              top: 5,
              right: 10,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              type="number"
              stroke="#6B7280"
              tick={{ fill: "#9CA3AF", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              dataKey="department"
              type="category"
              stroke="#6B7280"
              tick={{ fill: "#E5E7EB", fontSize: 17 }}
              axisLine={false}
              tickLine={false}
              width={100}
            />

            <Tooltip
              cursor={{ fill: "#1A2035" }}
              contentStyle={{
                background: "#13141F",
                border: "1px solid #1A2035",
                borderRadius: "1px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="employees"
              radius={[0, 3, 3, 0]}
              barSize={13}
            >
              {departmentStrength.map((item, index) => (
                <Cell
                  key={index}
                  fill={item.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

     
      <div className="grid grid-cols-2 gap-3 mt-1">
        {departmentStrength.map((dept) => (
          <div
            key={dept.department}
            className="flex items-center justify-between bg-[#171A27] border border-[#22263C] rounded-lg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: dept.color,
                }}
              />

              <span className="text-gray-300 text-xs">
                {dept.department}
              </span>
            </div>

            <span className="font-semibold text-white text-xs">
              {dept.employees}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentStrength;
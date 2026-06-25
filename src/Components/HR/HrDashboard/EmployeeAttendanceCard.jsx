import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { attendanceData } from "../../../data/HrData/HrdashboardData";
const EmployeeAttendanceCard = () => {
  const total = attendanceData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-md p-4 h-110  max-h-auto">
      <div className="flex justify-between items-center ">
        <div>
          <h2 className="text-md font-semibold text-white">
            Attendance Snapshot
          </h2>

          <p className="text-gray-400 text-xs">
            Today's attendance overview
          </p>
        </div>
      </div>


      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={attendanceData}
              innerRadius={65}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {attendanceData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#13141F",
                border: "1px solid #1A2035",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>


        <div className="relative -mt-35 flex flex-col items-center justify-center pointer-events-none">
          <h1 className="text-2xl font-bold text-white">
            {total}
          </h1>

          <p className="text-gray-400 text-xs">
            Employees
          </p>
        </div>
      </div>

     
      <div className="grid grid-cols-2 gap-2 mt-8">
        {attendanceData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between bg-[#171A27] rounded-lg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span className="text-gray-300">
                {item.name}
              </span>
            </div>

            <span className="font-semibold text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeAttendanceCard;
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

const chartData = [
  { day: "Jan 7", attendance: 13 },
  { day: "Jan 8", attendance: 15 },
  { day: "Jan 9", attendance: 11 },
  { day: "Jan 10", attendance: 13 },
  { day: "Jan 11", attendance: 16 },
  { day: "Jan 12", attendance: 17 },
  { day: "Jan 13", attendance: 14 },
];

const AttendanceTrend = () => {
  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-xl h-90 p-6">
     
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Weekly Attendance Trend
        </h2>

        <p className="text-gray-400 text-xs">
          Daily attendance for the current week
        </p>
      </div>

     
      <div className="h-[250px] -ml-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="attendanceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#ff4d6d"
                  stopOpacity={0.45}
                />
                <stop
                  offset="95%"
                  stopColor="#ff4d6d"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#252B42"
              strokeDasharray="5 5"
            />

            <XAxis
              dataKey="day"
              stroke="#8B8B8B"
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              stroke="#8B8B8B"
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#13141F",
                border: "1px solid #1A2035",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="attendance"
              stroke="#ff4d6d"
              strokeWidth={3}
              fill="url(#attendanceGradient)"
            />

            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#ff4d6d"
              strokeWidth={3}
              dot={{
                fill: "#ff4d6d",
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceTrend;
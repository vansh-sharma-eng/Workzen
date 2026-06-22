// src/Components/Wellness/WeeklyMoodTrend.jsx

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    day: "Mon",
    happy: 76,
    neutral: 20,
    stressed: 8,
  },
  {
    day: "Tue",
    happy: 72,
    neutral: 22,
    stressed: 10,
  },
  {
    day: "Wed",
    happy: 68,
    neutral: 25,
    stressed: 10,
  },
  {
    day: "Thu",
    happy: 74,
    neutral: 21,
    stressed: 9,
  },
  {
    day: "Fri",
    happy: 82,
    neutral: 16,
    stressed: 6,
  },
];

const WeeklyMoodTrend = () => {
  return (
    <div className=" border border-[#1E2235] bg-[#10111C] rounded-md p-4 h-[270px]">
      <h2 className="text-white text-md font-bold">
        Weekly Mood Trend
      </h2>

      <p className="text-[#A0AEC0] mt-1 text-xs">
        Team sentiment this week (%)
      </p>

      <div className="h-[170px] mt-4 text-sm -ml-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid
              stroke="#1F2937"
              strokeDasharray="0.5 0.5"
            />

            <XAxis
              dataKey="day"
              stroke="#94A3B8"
            />

            <YAxis
              stroke="#94A3B8"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="happy"
              stroke="#00D9A5"
              fill="#00D9A510"
              strokeWidth={2}
            />

            <Area
              type="monotone"
              dataKey="neutral"
              stroke="#F59E0B"
              fill="transparent"
              strokeWidth={2}
            />

            <Area
              type="monotone"
              dataKey="stressed"
              stroke="#EF4444"
              fill="transparent"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyMoodTrend;
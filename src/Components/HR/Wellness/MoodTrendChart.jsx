import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    day: "12-31",
    mood: 8,
    great: 8,
    good: 6,
    okay: 4,
    stressed: 2,
    burnout: 1,
  },
  {
    day: "01-01",
    mood: 5,
    great: 6,
    good: 7,
    okay: 5,
    stressed: 2,
    burnout: 1,
  },
  {
    day: "01-02",
    mood: 8,
    great: 8,
    good: 5,
    okay: 4,
    stressed: 3,
    burnout: 0,
  },
  {
    day: "01-03",
    mood: 2,
    great: 2,
    good: 6,
    okay: 6,
    stressed: 4,
    burnout: 2,
  },
  {
    day: "01-04",
    mood: 6,
    great: 6,
    good: 6,
    okay: 5,
    stressed: 3,
    burnout: 1,
  },
  {
    day: "01-05",
    mood: 5,
    great: 5,
    good: 6,
    okay: 6,
    stressed: 4,
    burnout: 1,
  },
  {
    day: "01-06",
    mood: 4,
    great: 4,
    good: 5,
    okay: 5,
    stressed: 3,
    burnout: 1,
  },
  {
    day: "01-07",
    mood: 6,
    great: 6,
    good: 5,
    okay: 7,
    stressed: 3,
    burnout: 2,
  },
  {
    day: "01-08",
    mood: 3,
    great: 3,
    good: 5,
    okay: 6,
    stressed: 4,
    burnout: 2,
  },
  {
    day: "01-09",
    mood: 3,
    great: 3,
    good: 5,
    okay: 5,
    stressed: 3,
    burnout: 1,
  },
  {
    day: "01-10",
    mood: 5,
    great: 5,
    good: 7,
    okay: 5,
    stressed: 4,
    burnout: 2,
  },
  {
    day: "01-11",
    mood: 3,
    great: 3,
    good: 5,
    okay: 6,
    stressed: 5,
    burnout: 2,
  },
  {
    day: "01-12",
    mood: 3,
    great: 3,
    good: 5,
    okay: 5,
    stressed: 5,
    burnout: 2,
  },
  {
    day: "01-13",
    mood: 9,
    great: 9,
    good: 6,
    okay: 4,
    stressed: 2,
    burnout: 1,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0].payload;

  return (
    <div className="bg-white rounded-xl shadow-2xl px-5 py-2 min-w-[100px]">

      <p className="text-gray-700 text-md mb-1">
        {label}
      </p>

      <div className="space-y-1 text-sm font-semibold">

        <p className="text-emerald-500">
          Great : {item.great}
        </p>

        <p className="text-indigo-500">
          Good : {item.good}
        </p>

        <p className="text-yellow-500">
          Okay : {item.okay}
        </p>

        <p className="text-orange-500">
          Stressed : {item.stressed}
        </p>

        <p className="text-red-500">
          Burned Out : {item.burnout}
        </p>

      </div>

    </div>
  );
};

const MoodTrendChart = () => {
  return (
    <div className="bg-[#151822] border border-[#1e2333] rounded-xl p-5 h-auto">

      <div className="mb-5">

        <h2 className="text-xl font-bold text-white">
          Team Mood Trend
        </h2>

        <p className="text-gray-400 text-xs">
          Last 14 days
        </p>

      </div>

      <div className="h-[330px] -ml-10">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="fillMood"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#F44336"
                  stopOpacity={0.9}
                />

                <stop
                  offset="95%"
                  stopColor="#F44336"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>
            <CartesianGrid
  stroke="#2A2F3D"
  strokeDasharray="4 4"
  vertical={true}
/>

<XAxis
  dataKey="day"
  axisLine={false}
  tickLine={false}
  tick={{
    fill: "#A1A1AA",
    fontSize: 12,
  }}
/>

<YAxis
  domain={[0, 20]}
  axisLine={false}
  tickLine={false}
  tick={{
    fill: "#A1A1AA",
    fontSize: 12,
  }}
/>

<Tooltip
  content={<CustomTooltip />}
  cursor={{
    stroke: "#ffffff",
    strokeWidth: 2,
  }}
/>

<Legend
  verticalAlign="bottom"
  align="center"
  iconType="circle"
  wrapperStyle={{
    paddingTop: 20,
    color: "#fff",
  }}
/>

<Area
  type="monotone"
  dataKey="mood"
  stroke="#F44336"
  strokeWidth={3}
  fill="url(#fillMood)"
  activeDot={{
    r: 6,
    fill: "#16A34A",
    stroke: "#fff",
    strokeWidth: 2,
  }}
  dot={false}
/>

</AreaChart>

</ResponsiveContainer>

</div>

<div className="mt-4 flex flex-wrap justify-center gap-6 text-xs">

  <div className="flex items-center gap-2 text-emerald-400">
    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
    Great
  </div>

  <div className="flex items-center gap-2 text-indigo-400">
    <span className="w-3 h-3 rounded-full bg-indigo-400"></span>
    Good
  </div>

  <div className="flex items-center gap-2 text-yellow-400">
    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
    Okay
  </div>

  <div className="flex items-center gap-2 text-orange-400">
    <span className="w-3 h-3 rounded-full bg-orange-400"></span>
    Stressed
  </div>

  <div className="flex items-center gap-2 text-red-400">
    <span className="w-3 h-3 rounded-full bg-red-400"></span>
    Burned Out
  </div>

</div>

</div>
  );
};

export default MoodTrendChart;
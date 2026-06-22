import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const moodData = [
  { name: "Happy", value: 68, color: "#10B981" },
  { name: "Neutral", value: 22, color: "#F59E0B" },
  { name: "Stressed", value: 10, color: "#EF4444" },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-[#0F1328] border border-[#1E2337] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-white font-medium">
        {data.name}
      </p>

      <p
        className="text-sm mt-1"
        style={{ color: data.color }}
      >
        {data.value}% Employees
      </p>
    </div>
  );
};

const TeamMoodToday = () => {
  const [activeIndex, setActiveIndex] =
    useState(null);

  return (
    <div className="bg-[#13141F] border border-[#1E2337] rounded-xl w-[340px] p-4 h-[320px]">
      <h2 className="text-white text-[13px] font-semibold">
        Team Mood Today
      </h2>

      <p className="text-[#94A3B8] text-xs mb-4">
        142 employees checked in
      </p>

      <div className="relative h-[140px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Tooltip
              content={<CustomTooltip />}
            />

            <Pie
              data={moodData}
              dataKey="value"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={2}
              onMouseEnter={(_, index) =>
                setActiveIndex(index)
              }
              onMouseLeave={() =>
                setActiveIndex(null)
              }
              animationDuration={500}
            >
              {moodData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                    stroke="none"
                    style={{
                      filter:
                        activeIndex === index
                          ? `drop-shadow(0 0 7px ${entry.color})`
                          : "none",
                      cursor: "pointer",
                    }}
                  />
                )
              )}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-white text-xl font-bold">
            {activeIndex !== null
              ? `${moodData[activeIndex].value}%`
              : "68%"}
          </span>

          <span className="text-[#94A3B8] text-xs">
            {activeIndex !== null
              ? moodData[activeIndex].name
              : "Happy"}
          </span>
        </div>
      </div>

      <div className="space-y-4 mt-3">
        {moodData.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />

            <div className="w-20 text-white text-xs">
              {item.name}
            </div>

            <div className="flex-1 h-2 rounded-full bg-[#151A30] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${item.value}%`,
                  backgroundColor:
                    item.color,
                }}
              />
            </div>

            <span
              className="text-xs font-medium"
              style={{
                color: item.color,
              }}
            >
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMoodToday;
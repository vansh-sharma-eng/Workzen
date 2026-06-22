// src/Components/Wellness/MoodStats.jsx

import {
  Smile,
  Meh,
  Frown,
} from "lucide-react";

const stats = [
  {
    title: "Happy",
    count: "97 employees",
    percent: "68%",
    icon: Smile,
    color: "text-emerald-400",
  },
  {
    title: "Neutral",
    count: "31 employees",
    percent: "22%",
    icon: Meh,
    color: "text-amber-400",
  },
  {
    title: "Stressed",
    count: "14 employees",
    percent: "10%",
    icon: Frown,
    color: "text-red-400",
  },
];

const MoodStats = ({ sidebarCollapsed }) => {
  return (
    <div
      className={`grid gap-4 transition-all duration-300 ${
        sidebarCollapsed
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              border border-[#1E2235]
              bg-[#10111C]
              rounded-lg
              p-5
              w-full
              min-h-[110px]
              hover:border-[#2A314B]
              transition-all
              duration-300
            "
          >
            <div className="flex justify-between  items-start">
              <Icon className={`w-6 h-6 ${item.color}`} />

              <h1 className={`text-xl font-bold ${item.color}`}>
                {item.percent}
              </h1>
            </div>

            <div className="mt-3">
              <h2 className="text-white text-sm font-semibold">
                {item.title}
              </h2>

              <p className="text-[#9CA3AF] text-xs mt-1">
                {item.count}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoodStats;
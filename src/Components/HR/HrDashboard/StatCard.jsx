import React from "react";
import {
  Users,
  CalendarClock,
  HeartPulse,
  BriefcaseBusiness,
} from "lucide-react";

const iconMap = {
  Users,
  CalendarClock,
  HeartPulse,
  BriefcaseBusiness,
};

const StatCard = ({ card }) => {
  const Icon = iconMap[card.icon];

  return (
    <div
      className={`
        bg-[#13141F]
        ${card.border}
        border
        rounded-md
        p-3
        transition-all
        duration-300
        hover:border-indigo-500
        hover:-translate-y-1
        hover:shadow-xl
      `}
    >
      <div className="flex items-start gap-5">
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center"
          style={{
            backgroundColor: `${card.color}20`,
          }}
        >
          <Icon
            size={17}
            style={{
              color: card.color,
            }}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-gray-400 text-sm">{card.title}</p>

          <h2
            className="text-2xl font-bold "
            style={{ color: card.color }}
          >
            {card.value}
          </h2>

          <p className="text-gray-500 text-xs text-base">
            {card.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
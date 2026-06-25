import React from "react";
import {
  BadgeCheck,
  XCircle,
  Clock3,
  Laptop,
} from "lucide-react";

const attendanceCards = [
  {
    id: 1,
    title: "Present Today",
    value: 10,
    subtitle: "50% of headcount",
    color: "#10B981",
    icon: BadgeCheck,
  },
  {
    id: 2,
    title: "Absent Today",
    value: 3,
    subtitle: "15% absent",
    color: "#EF4444",
    icon: XCircle,
  },
  {
    id: 3,
    title: "Late Arrivals",
    value: 3,
    subtitle: "Checked in after 9 AM",
    color: "#F59E0B",
    icon: Clock3,
  },
  {
    id: 4,
    title: "WFH Today",
    value: 4,
    subtitle: "Working remotely",
    color: "#3B82F6",
    icon: Laptop,
  },
];

const AttendanceSummary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {attendanceCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="
              bg-[#13141F]
              border
              border-[#1A2035]
              rounded-2xl
              p-4
              hover:border-indigo-500
              transition-all
              duration-300
            "
          >
            <div className="flex items-center gap-5">
             
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center"
                style={{
                  backgroundColor: `${card.color}15`,
                }}
              >
                <Icon
                  size={20}
                  style={{
                    color: card.color,
                  }}
                />
              </div>

              
              <div>
                <p className="text-gray-400 text-md">
                  {card.title}
                </p>

                <h2 className="text-2xl font-bold text-white">
                  {card.value}
                </h2>

                <p className="text-gray-500 text-xs">
                  {card.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceSummary;
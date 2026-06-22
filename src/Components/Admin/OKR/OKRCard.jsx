// src/Components/OKR/OKRCard.jsx

import React from "react";
import {
  Clock3,
  Target,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const OKRCard = ({ okr }) => {
  const isOnTrack = okr.status === "On Track";

  return (
    <div className=" bg-[#10111C] border border-[#1E2235]  rounded-md h-auto p-3">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-md bg-indigo-950 flex items-center justify-center">
            <Target
              className="text-indigo-500"
              size={16}
            />
          </div>

          <div className="-mt-1">
            <h2 className="text-md font-semibold text-white">
              {okr.title}
            </h2>

            <p className="text-gray-400 text-xs">
              Owner: {okr.owner} • {okr.department}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div
            className={`px-2 py-1 rounded-full flex items-center gap-2 ${
              isOnTrack
                ? "bg-emerald-950 text-emerald-400"
                : "bg-amber-950 text-amber-400"
            }`}
          >
            {isOnTrack ? (
              <CheckCircle2 size={13} />
            ) : (
              <AlertTriangle size={13} />
            )}

            {okr.status}
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Clock3 size={14} />
            {okr.dueDate}
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-3">
        Overall Progress
      </p>

      <div className="relative">
        <div className="h-1 bg-[#161D35] rounded-full">
          <div
            className={`h-2 rounded-full text-sm ${
              isOnTrack
                ? "bg-emerald-500"
                : "bg-amber-500"
            }`}
            style={{
              width: `${okr.progress}%`,
            }}
          />
        </div>

        <span
          className={`absolute -top-8 right-0 text-md text-sm font-bold ${
            isOnTrack
              ? "text-emerald-400"
              : "text-amber-400"
          }`}
        >
          {okr.progress}%
        </span>
      </div>

      <div className="mt-4 space-y-1.5">
        {okr.objectives.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full" />

              <p className="text-white text-sm">
                {item.text}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-16 h-1 bg-[#161D35] rounded-full overflow-hidden">
                <div
                  className="h-1 bg-indigo-500"
                  style={{
                    width: `${item.progress}%`,
                  }}
                />
              </div>

              <span className="text-gray-400 w-12 text-sm text-right">
                {item.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OKRCard;
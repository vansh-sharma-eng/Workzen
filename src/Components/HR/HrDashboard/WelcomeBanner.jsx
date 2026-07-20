import React from "react";
import {
  CalendarDays,
  Clock3,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const WelcomeBanner = ({ data }) => {
  const today = new Date();
  const firstName = (data?.name || data?.Name || "").split(" ")[0] || "there";

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-md p-4">
      <div className="h-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>
          <div className="flex items-center gap-2
           text-indigo-400 ">
            <Sparkles size={12} />
            <span className="text-xs font-medium ">
              HR Dashboard
            </span>
          </div>

          <h1 className="text-sm font-bold text-white">
            Welcome back, {firstName} 👋
          </h1>

          <p className="text-gray-400 w-170 text-[10px] ">
            Here's a quick overview of your HR activities today.
            Review attendance, pending approvals, department
            strength, and employee updates from one place.
          </p>
        </div>

        <div className="flex flex-col mt-4 gap-1 py-5 text-xs lg:items-end">
          <div className="flex items-center gap-3 text-gray-300">
            <CalendarDays
              size={13}
              className="text-indigo-400"
            />

            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center  gap-3 text-gray-300">
            <Clock3
              size={13}
              className="text-green-400 "
            />

            <span>
              {today.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
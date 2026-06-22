import React from "react";
import { Clock3 } from "lucide-react";

const LeavePredictions = ({ sidebarCollapsed }) => {
  const leaves = [
    {
      initials: "VP",
      name: "Vikram Patel",
      department: "Sales",
      reason: "Historical pattern matches",
      probability: "85%",
      date: "Next week",
    },
    {
      initials: "PM",
      name: "Priya Mehta",
      department: "Engineering",
      reason: "Pre-booked travel detected",
      probability: "60%",
      date: "Jun 20-25",
    },
  ];

  return (
    <div
      className={`
        bg-[#10111C]
        border border-[#1E2235]
        rounded-md
        p-6
        transition-all
        duration-300
        ${
          sidebarCollapsed
            ? "-ml-1 w-[calc(118%)]"
            : "-ml-1 w-[calc(115%)]"
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Clock3 size={15} className="text-indigo-400" />
        <h2 className="text-white text-md font-semibold">
          Leave Predictions
        </h2>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {leaves.map((leave, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-[#10111C] border border-[#1E2235] rounded-md px-4 py-2"
          >
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-[#131a3a] flex items-center justify-center">
                <span className="text-indigo-400 font-bold text-lg">
                  {leave.initials}
                </span>
              </div>

              <div>
                <h3 className="text-white text-sm font-semibold">
                  {leave.name}
                  <span className="text-gray-400 text-sm font-normal">
                    {" "}
                    · {leave.department}
                  </span>
                </h3>

                <p className="text-gray-400 text-xs mt-1">
                  {leave.reason}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-amber-400 text-sm font-bold">
                {leave.probability}
              </p>

              <p className="text-slate-400 text-[11px] mt-1">
                {leave.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeavePredictions;
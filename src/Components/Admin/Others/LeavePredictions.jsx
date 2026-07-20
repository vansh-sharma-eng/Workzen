import React, { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import { leaveApi } from "../../../api";

const initials = (name) =>
  (name || "").split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase() || "??";

/** Real upcoming leave — approved requests starting today or later — not a fabricated prediction. */
const LeavePredictions = ({ sidebarCollapsed }) => {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    leaveApi
      .getAll()
      .then((all) => {
        if (cancelled) return;
        const todayIso = new Date().toISOString().slice(0, 10);
        const list = all
          .filter((l) => l.status === "APPROVED" && l.toDate >= todayIso)
          .sort((a, b) => a.fromDate.localeCompare(b.fromDate))
          .slice(0, 6);
        setUpcoming(list);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

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
      <div className="flex items-center gap-2 mb-5">
        <Clock3 size={15} className="text-indigo-400" />
        <h2 className="text-white text-md font-semibold">
          Upcoming Leave
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {loading ? (
          <p className="text-gray-500 text-sm">Loading…</p>
        ) : upcoming.length === 0 ? (
          <p className="text-gray-500 text-sm">No approved upcoming leave right now.</p>
        ) : (
          upcoming.map((leave) => (
            <div
              key={leave.id}
              className="flex items-center justify-between bg-[#10111C] border border-[#1E2235] rounded-md px-4 py-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-[#131a3a] flex items-center justify-center">
                  <span className="text-indigo-400 font-bold text-lg">
                    {initials(leave.employeeName)}
                  </span>
                </div>

                <div>
                  <h3 className="text-white text-sm font-semibold">
                    {leave.employeeName}
                    <span className="text-gray-400 text-sm font-normal"> · {leave.type}</span>
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">{leave.reason}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-slate-300 text-sm font-medium">
                  {new Date(leave.fromDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  {" – "}
                  {new Date(leave.toDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeavePredictions;

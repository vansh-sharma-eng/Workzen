import React from "react";

const STATUS_LABEL = {
  PRESENT: "Present",
  LATE: "Late",
  ABSENT: "Absent",
  WFH: "WFH",
  ON_LEAVE: "On Leave",
};

const statusColor = {
  PRESENT: "bg-emerald-500/10 text-emerald-400",
  LATE: "bg-amber-500/10 text-amber-400",
  ABSENT: "bg-red-500/10 text-red-400",
  WFH: "bg-indigo-500/10 text-indigo-400",
  ON_LEAVE: "bg-slate-500/10 text-slate-400",
};

const QUICK_ACTIONS = ["PRESENT", "LATE", "ABSENT", "WFH"];

const AttendanceTable = ({ data, date, onMark, marking, sidebarCollapsed, showTeam }) => {
  return (
    <div
      className={`transition-all duration-300 ${
        sidebarCollapsed
          ? "ml-16 w-[calc(100%-4rem)]"
          : "ml-12 w-[calc(100%]"
      }`}
    >
      <div className="w-full bg-[#10111C] border border-[#20263a] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#20263a]">
          <h2 className="text-white text-md font-semibold">
            Attendance Log
          </h2>

          <p className="text-[#94a3b8] text-xs mt-1">
            {date}
          </p>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-[#20263a]">
                <th className="text-left px-4 py-3 text-xs font-medium text-[#94a3b8] w-[25%]">
                  Employee
                </th>

                {showTeam && (
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#94a3b8]">
                    Team (HR)
                  </th>
                )}

                <th className="text-left px-4 py-3 text-xs font-medium text-[#94a3b8]">
                  Check In
                </th>

                <th className="text-left px-4 py-3 text-xs font-medium text-[#94a3b8]">
                  Check Out
                </th>

                <th className="text-left px-4 py-3 text-xs font-medium text-[#94a3b8]">
                  Mode
                </th>

                <th className="text-left px-4 py-3 text-xs font-medium text-[#94a3b8] w-[30%]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {(data || []).map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-[#20263a] hover:bg-[#151826] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-semibold text-xs flex-shrink-0">
                        {emp.initials}
                      </div>

                      <span className="text-white text-sm truncate">
                        {emp.employee}
                      </span>
                    </div>
                  </td>

                  {showTeam && (
                    <td className="px-4 py-3 text-xs text-[#94a3b8] truncate">
                      {emp.team || <span className="text-[#475569]">Unassigned</span>}
                    </td>
                  )}

                  <td className="px-4 py-3 text-sm text-white">
                    {emp.checkIn}
                  </td>

                  <td className="px-4 py-3 text-sm text-white">
                    {emp.checkOut}
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-[#151a2f] text-[#94a3b8] whitespace-nowrap">
                      {emp.mode}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {emp.status ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${statusColor[emp.status] || ""}`}
                      >
                        {STATUS_LABEL[emp.status] || emp.status}
                      </span>
                    ) : (
                      <div className="flex gap-1 flex-wrap">
                        {QUICK_ACTIONS.map((s) => (
                          <button
                            key={s}
                            disabled={marking === emp.id}
                            onClick={() => onMark?.(emp.id, s)}
                            className="px-2 py-1 rounded-full text-[10px] border border-[#2A314D] text-gray-300 hover:border-indigo-500 hover:text-indigo-300 transition disabled:opacity-40"
                          >
                            {marking === emp.id ? "…" : STATUS_LABEL[s]}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;

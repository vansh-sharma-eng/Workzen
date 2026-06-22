import React from "react";

const AttendanceTable = ({ data, sidebarCollapsed }) => {
  const statusColor = {
    Present: "bg-emerald-500/10 text-emerald-400",
    Late: "bg-amber-500/10 text-amber-400",
    Absent: "bg-red-500/10 text-red-400",
  };

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
            Today's Attendance Log
          </h2>

          <p className="text-[#94a3b8] text-xs mt-1">
            Jun 5, 2026 — Live
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

                <th className="text-left px-4 py-3 text-xs font-medium text-[#94a3b8]">
                  Check In
                </th>

                <th className="text-left px-4 py-3 text-xs font-medium text-[#94a3b8]">
                  Check Out
                </th>

                <th className="text-left px-4 py-3 text-xs font-medium text-[#94a3b8]">
                  Hours
                </th>

                <th className="text-left px-4 py-3 text-xs font-medium text-[#94a3b8]">
                  Mode
                </th>

                <th className="text-left px-4 py-3 text-xs font-medium text-[#94a3b8]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((emp) => (
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

                  <td className="px-4 py-3 text-sm text-white">
                    {emp.checkIn}
                  </td>

                  <td className="px-4 py-3 text-sm text-white">
                    {emp.checkOut}
                  </td>

                  <td className="px-4 py-3 text-sm text-white">
                    {emp.hours}
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-[#151a2f] text-[#94a3b8] whitespace-nowrap">
                      {emp.mode}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${statusColor[emp.status]}`}
                    >
                      {emp.status}
                    </span>
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
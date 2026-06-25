import React from "react";
import AttendanceRow from "./AttendanceRow";
import { attendanceData } from "../../../data/HrData/HrdashboardData";
const AttendanceTable = () => {
  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#1A2035]">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Employee Attendance
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Today's attendance records
          </p>
        </div>

        <button className="text-sm text-indigo-400 hover:text-indigo-300 transition">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead className="bg-[#171A27]">
            <tr className="border-b border-[#1A2035]">
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Employee
              </th>

              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Check In
              </th>

              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Check Out
              </th>

              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Working Hours
              </th>

              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {attendanceData.map((employee) => (
              <AttendanceRow
                key={employee.id}
                employee={employee}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
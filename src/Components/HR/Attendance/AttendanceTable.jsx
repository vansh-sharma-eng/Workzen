import React from "react";
import AttendanceRow from "./AttendanceRow";
import { attendanceLogs } from "../../../data/attendanceData";
const AttendanceTable = () => {
  return (
    <div className="bg-[#13141F] border border-[#1A2035]  rounded-xl overflow-hidden">

      <table className="w-full text-xs">

        <thead className="bg-[#13141F] border border-[#1A2035]">

          <tr>

            <th className="px-6 py-5 text-left uppercase text-gray-500 font-semibold">
              Employee
            </th>

            <th className="px-6 py-5 text-left uppercase text-gray-500 font-semibold">
              Department
            </th>

            <th className="px-8 py-5 text-left uppercase text-gray-500 font-semibold">
              Today
            </th>

            <th className="px-10 py-5 text-left uppercase text-gray-500 font-semibold">
              This Week %
            </th>

            <th className="px-6 py-5 text-left uppercase text-gray-500 font-semibold">
              Avg Hours/Day
            </th>

          </tr>

        </thead>

        <tbody>

          {attendanceLogs.map((employee) => (
            <AttendanceRow
              key={employee.id}
              employee={employee}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default AttendanceTable;
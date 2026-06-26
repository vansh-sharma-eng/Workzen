import React from "react";

import AttendanceFilters from "../../Components/HR/Attendance/AttendanceFilters";
import AttendanceSummary from "../../Components/HR/Attendance/AttendanceSummary";
import AttendanceTrend from "../../Components/HR/Attendance/AttendanceTrend";
import DepartmentAttendance from "../../Components/HR/Attendance/DepartmentAttendance";
import AttendanceTable from "../../Components/HR/Attendance/AttendanceTable";
import LateArrivals from "../../Components/HR/Attendance/LateArrivals";

import { ChevronLeft, ChevronRight } from "lucide-react";

const AttendanceDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-[#0F111A] text-white">
      <main>
        
        <div className="mt-2">
          <AttendanceFilters />
        </div>

        
        <div className="mt-6">
          <AttendanceSummary />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          <AttendanceTrend />
          <DepartmentAttendance />
        </div>

        {/* Attendance Table */}
        <div className="mt-6">
          <AttendanceTable />
        </div>

        {/* Late Arrivals */}
        <div className="mt-6">
          <LateArrivals />
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
          <p className="text-xs text-gray-400">
            Showing{" "}
            <span className="text-white font-semibold">1</span> –
            <span className="text-white font-semibold"> 10 </span>
            of
            <span className="text-white font-semibold"> 20 </span>
            employees
          </p>

          <div className="flex items-center gap-2 text-xs mb-10">
            <button className="w-9 h-9 rounded-lg border border-[#1A2035] bg-[#13141F] hover:bg-[#1A2035] flex items-center justify-center">
              <ChevronLeft size={13} />
            </button>

            <button className="w-9 h-9 rounded-lg bg-indigo-600">
              1
            </button>

            <button className="w-9 h-9 rounded-lg border border-[#1A2035] bg-[#13141F] hover:bg-[#1A2035]">
              2
            </button>

            <button className="w-9 h-9 rounded-lg border border-[#1A2035] bg-[#13141F] hover:bg-[#1A2035]">
              3
            </button>

            <button className="w-9 h-9 rounded-lg border border-[#1A2035] bg-[#13141F] hover:bg-[#1A2035] flex items-center justify-center">
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendanceDashboard;
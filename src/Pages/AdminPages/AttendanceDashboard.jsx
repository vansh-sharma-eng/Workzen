import React from "react";
import AttendanceStats from "../../Components/attendance/Admin/AttendanceStats";
import AttendanceChart from "../../Components/attendance/Admin/AttendanceChart";
import AttendanceTable from "../../Components/attendance/Admin/AttendanceTable";
import {
  stats,
  weeklyAttendance,
  attendanceLogs,
} from "../../data/attendanceData";

const AttendanceDashboard = ({ sidebarCollapsed }) => {
  return (
    <div
      className={`
        transition-all
        duration-300
        mt-18
        ${
          sidebarCollapsed
            ? "ml-17 w-[calc(100%-4rem)]"
            : "ml-57 w-[calc(100%-14rem)]"
        }
      `}
    >
      <AttendanceStats stats={stats} />

      <div className="grid grid-cols-12 gap-5 mt-6">
        <div className="col-span-4">
          <AttendanceChart data={weeklyAttendance} />
        </div>

        <div className="col-span-8">
          <AttendanceTable data={attendanceLogs} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
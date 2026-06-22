import AttendanceStats from "./AttendanceStats";
import AttendanceStatus from "./AttendanceStatus";
import AttendanceCalendar from "./AttendanceCalendar";

const EmployeeAttendance = () => {
  return (
    <div className="p-6">
      <AttendanceStats />

      <div className="mt-6">
        <AttendanceStatus />
      </div>

      <div className="mt-6">
        <AttendanceCalendar />
      </div>
    </div>
  );
};

export default EmployeeAttendance;
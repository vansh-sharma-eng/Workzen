import AttendanceStats from "../../Components/Employee/Employee/AttendanceStatus";
import AttendanceStatus from "../../Components/Employee/Employee/AttendanceStats";
import AttendanceCalendar from "../../Components/Employee/Employee/AttendanceCalendar";

const EmployeeAttendanceDashboard = () => {
  return (
    <div className="space-y-6">
      <AttendanceStats />
      <AttendanceStatus />
      <AttendanceCalendar />
    </div>
  );
};

export default EmployeeAttendanceDashboard;
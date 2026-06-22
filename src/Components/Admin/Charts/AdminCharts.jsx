import AttendanceTrend from "./AttendanceTrend";
import TeamMoodToday from "./TeamMoodToday";
import DepartmentProductivity from "./DepartmentProductivity";
import AIAlerts from "./AIAlerts";
import LiveEmployeeStatus from "./LiveEmployeeStatus";
import RecentActivity from "./RecentActivity";

const AdminCharts = ({ sidebarCollapsed }) => {
  return (
    <div
      className={`transition-all duration-300 pb-5  mt-10 px-4 ${
        sidebarCollapsed
          ? "ml-13 w-[calc(100%--1rem)]"
          : "ml-53 w-[calc(100%-14rem)]"
      }`}
    >
      {/* Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
        <div className="md:col-span-2">
          <AttendanceTrend />
        </div>

        <TeamMoodToday />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
       <div className="md:col-span-2">
        <DepartmentProductivity />
       </div>
        <AIAlerts />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="md:col-span-2">
        <LiveEmployeeStatus />
        </div>

        <RecentActivity />
      </div>
    </div>
  );
};

export default AdminCharts;
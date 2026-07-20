import AttendanceTrend from "./AttendanceTrend";
import DepartmentProductivity from "./DepartmentProductivity";
import AIAlerts from "./AIAlerts";
import LiveEmployeeStatus from "./LiveEmployeeStatus";
import RecentActivity from "./RecentActivity";
import { useAdminOverview } from "../../../Utils/useAdminOverview";
import { useNotifications } from "../../../Utils/useNotifications";

const AdminCharts = ({ employees = [], sidebarCollapsed }) => {
  const { tasks, leaves, weekTrend, todayRecords, loading } = useAdminOverview();
  const { notifications } = useNotifications();

  // Same completion-rate-by-department calc DepartmentProductivity does internally,
  // recomputed here just so AIAlerts can reference the #1 department without prop-drilling logic twice.
  const deptData = (() => {
    const deptByEmployeeId = new Map(employees.map((e) => [e.id, e.department || "Unassigned"]));
    const totals = new Map();
    tasks.forEach((t) => {
      const dept = deptByEmployeeId.get(t.assignedToId) || "Unassigned";
      if (!totals.has(dept)) totals.set(dept, { total: 0, completed: 0 });
      const entry = totals.get(dept);
      entry.total += 1;
      if (t.status === "COMPLETED") entry.completed += 1;
    });
    return [...totals.entries()]
      .filter(([, v]) => v.total > 0)
      .map(([department, v]) => ({ department, score: Math.round((v.completed / v.total) * 100) }))
      .sort((a, b) => b.score - a.score);
  })();

  return (
    <div
      className={`transition-all duration-300 pb-5  mt-10 px-4 ${
        sidebarCollapsed
          ? "ml-13 w-[calc(100%--1rem)]"
          : "ml-53 w-[calc(100%-14rem)]"
      }`}
    >
      {loading && (
        <div className="text-[#64748B] text-xs mb-3 font-mono">Refreshing dashboard data…</div>
      )}

      {/* Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
        <div className="md:col-span-2">
          <AttendanceTrend data={weekTrend} />
        </div>

        <AIAlerts leaves={leaves} tasks={tasks} deptData={deptData} />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="md:col-span-2">
        <LiveEmployeeStatus records={todayRecords} />
        </div>

        <RecentActivity notifications={notifications} />
      </div>

      {/* Row 3 */}
      <div className="mt-5">
        <DepartmentProductivity employees={employees} tasks={tasks} />
      </div>
    </div>
  );
};

export default AdminCharts;

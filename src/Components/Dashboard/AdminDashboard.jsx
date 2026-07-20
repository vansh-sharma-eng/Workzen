import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";

import AdminCards from "../Admin/Others/AdminCards";
import AdminCharts from "../Admin/Charts/AdminCharts";
import AdminSidebar from "../layout/Admin/AdminSidebar";
import AdminHeader from "../layout/Admin/AdminHeader";

import CreateTask from "../Tasks/CreateTask";
import CreateEmployee from "../Admin/CreateEmployees/CreateEmployee";

import AdminEmployeesPage from "../../Pages/AdminPages/AdminEmployeesPage";
import AdminLeavePage from "../../Pages/AdminPages/AdminLeavePage";
import AttendanceDashboard from "../../Pages/AdminPages/AttendanceDashboard";
import SettingsPage from "../../Pages/AdminPages/SettingsPage";
import { useAdminOverview } from "../../Utils/useAdminOverview";

const AdminDashboard = ({ data, changeuser, handleLogout, onUserUpdate }) => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [openEmployeeForm, setOpenEmployeeForm] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { userData, refreshData } = useContext(AuthContext);
  const { tasks, leaves, todayStats } = useAdminOverview();

  useEffect(() => {
    refreshData?.();
  }, []);

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  const employees = userData?.employeesData || [];

  const totalEmployees = employees.length;

  const now = new Date();
  const newThisMonth = employees.filter((e) => {
    if (!e.createdAt) return false;
    const created = new Date(e.createdAt);
    return created.getFullYear() === now.getFullYear() && created.getMonth() === now.getMonth();
  }).length;

  const departments = [
    ...new Set(
      employees
        .map((e) => e.department)
        .filter(Boolean)
    ),
  ];

  const totalDepartments = departments.length;

  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completedCount = tasks.filter((t) => t.status === "COMPLETED").length;
  const taskCompletionRate = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  const presentToday = (todayStats?.present || 0) + (todayStats?.wfh || 0);
  const lateToday = todayStats?.late || 0;
  const onLeaveToday = todayStats?.onLeave || 0;
  const attendanceRate =
    !todayStats || todayStats.total === 0
      ? "0%"
      : `${((presentToday / todayStats.total) * 100).toFixed(1)}%`;

  const pendingLeaveRequests = leaves.filter((l) => l.status === "PENDING").length;

  const dashboardData = {
    totalEmployees,
    newThisMonth,
    totalDepartments,
    totalTasks,
    inProgressTasks,
    completedCount,
    taskCompletionRate,
    presentToday,
    lateToday,
    onLeaveToday,
    pendingLeaveRequests,
    attendanceRate,
  };

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <div className="p-6">
            <AdminCards
              data={dashboardData}
              sidebarCollapsed={sidebarCollapsed}
            />

            <AdminCharts
              employees={employees}
              sidebarCollapsed={sidebarCollapsed}
            />
          </div>
        );

      case "Employees":
        return (
         <div className="p-6 mt-20">
           <AdminEmployeesPage
            data={data}
            sidebarCollapsed={sidebarCollapsed}
          />
         </div>
        );

      case "Attendance":
        return (
          <div className="p-6">
            <AttendanceDashboard
            sidebarCollapsed={sidebarCollapsed}
          />
          </div>
        );

      case "Leave Management":
        return (
          <div className="p-6">
            <AdminLeavePage
            sidebarCollapsed={sidebarCollapsed}
          />
          </div>
        );

      case "Settings":
        return (
          <SettingsPage
            sidebarCollapsed={sidebarCollapsed}
            data={data}
          />
        );

      default:
        return (
          <div className="p-6">
            <AdminCards
              data={dashboardData}
              sidebarCollapsed={sidebarCollapsed}
            />

            <AdminCharts
              employees={employees}
              sidebarCollapsed={sidebarCollapsed}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] overflow-hidden select-none">
      {openTaskForm && (
        <CreateTask
          setOpenTaskForm={setOpenTaskForm}
        />
      )}

      {openEmployeeForm && (
        <CreateEmployee
          setOpenEmployeeForm={setOpenEmployeeForm}
        />
      )}

      <AdminSidebar
        data={data}
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      <AdminHeader
        activePage={activePage}
        setActivePage={setActivePage}
        setOpenTaskForm={setOpenTaskForm}
        setOpenEmployeeForm={setOpenEmployeeForm}
        changeuser={changeuser}
        handleLogout={handleLogout}
        data={data}
        isSidebarCollapsed={sidebarCollapsed}
        onUserUpdate={onUserUpdate}
      />

      {renderPage()}
    </div>
  );
};

export default AdminDashboard;


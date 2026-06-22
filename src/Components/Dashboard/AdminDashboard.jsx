import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useTheme } from "../Context/ThemeContext";

import AdminCards from "../Admin/Others/AdminCards";
import AdminCharts from "../Admin/Charts/AdminCharts";
import AdminSidebar from "../layout/Admin/AdminSidebar";
import AdminHeader from "../layout/Admin/AdminHeader";

import CreateTask from "../Tasks/CreateTask";
import CreateEmployee from "../Admin/CreateEmployees/CreateEmployee";

import AdminEmployeesPage from "../../Pages/AdminPages/AdminEmployeesPage";
import AdminLeavePage from "../../Pages/AdminPages/AdminLeavePage";
import AttendanceDashboard from "../../Pages/AdminPages/AttendanceDashboard";
import AIInsights from "../../Pages/AdminPages/AIInsightsPage";
import EmployeeWellness from "../../Pages/EmployeePages/EmployeeWellness";
import PayrollPage from "../../Pages/AdminPages/PayrollPage";
import OKRPage from "../../Pages/EmployeePages/OKRPage";
import DocumentsPage from "../../Pages/AdminPages/DocumentsPage";
import SettingsPage from "../../Pages/AdminPages/SettingsPage";

const AdminDashboard = ({ data, changeuser }) => {
  const { theme } = useTheme();

  const [activePage, setActivePage] = useState("Dashboard");
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [openEmployeeForm, setOpenEmployeeForm] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { userData, refreshData } = useContext(AuthContext);

  useEffect(() => {
    refreshData?.();
  }, []);

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  const employees = userData?.employeesData || [];

  const totalEmployees = employees.length;

  const onLeaveToday = employees.filter(
    (e) => e.leaveStatus === "approved"
  ).length;

  const activeEmployees = totalEmployees - onLeaveToday;

  const departments = [
    ...new Set(
      employees
        .map((e) => e.department)
        .filter(Boolean)
    ),
  ];

  const totalDepartments = departments.length;

  const totalTasks = employees.reduce(
    (sum, emp) => sum + (emp.taskNumber?.total || 0),
    0
  );

  const inProgressTasks = employees.reduce(
    (sum, emp) => sum + (emp.taskNumber?.inProgress || 0),
    0
  );

  const completedCount = employees.reduce(
    (sum, emp) => sum + (emp.taskNumber?.completed || 0),
    0
  );

  const attendanceRate =
    totalEmployees === 0
      ? "0%"
      : `${(
          (activeEmployees / totalEmployees) *
          100
        ).toFixed(1)}%`;

  const dashboardData = {
    totalEmployees,
    activeEmployees,
    onLeaveToday,
    totalDepartments,
    totalTasks,
    inProgressTasks,
    completedCount,
    monthlySalary: "$0",
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

      case "AI Insights":
        return (
         <div className="p-6 ">
           <AIInsights
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

      case "Mood Tracker":
        return (
          <EmployeeWellness
            sidebarCollapsed={sidebarCollapsed}
          />
        );

      case "Payroll & Finance":
        return (
          <PayrollPage
            sidebarCollapsed={sidebarCollapsed}
          />
        );

      case "OKR & Goals":
        return (
         <div className="p-6">
          <h1>Comming Soo...</h1>
         </div>
        );

      case "Documents":
        return (
          <DocumentsPage
            sidebarCollapsed={sidebarCollapsed}
          />
        );

      case "Settings":
        return (
          <SettingsPage
            sidebarCollapsed={sidebarCollapsed}
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
        data={data}
        isSidebarCollapsed={sidebarCollapsed}
      />

      {renderPage()}
    </div>
  );
};

export default AdminDashboard;


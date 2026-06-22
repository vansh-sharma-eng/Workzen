import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import AdminCards from "../Admin/AdminCards";
import AdminCharts from "../Admin/Charts/AdminCharts"
import AdminSidebar from "../layout/Admin/AdminSidebar";
import CreateTask from "../Tasks/CreateTask";
import CreateEmployee from "../Employees/CreateEmployee";
import AdminHeader from "../layout/Admin/AdminHeader";
import AdminEmployeesPage from "../../Pages/AdminPages/AdminEmployeesPage";
import AdminLeavePage from "../../Pages/AdminPages/AdminLeavePage"
import AttendanceDashboard from "../../Pages/AdminPages/AttendanceDashboard";
import AIInsights from "../../Pages/AdminPages/AIInsightsPage";
import EmployeeWellness from "../../Pages/EmployeePages/EmployeeWellness";
import PayrollPage from "../../Pages/AdminPages/PayrollPage";
import OKRPage from "../../Pages/EmployeePages/OKRPage";
import DocumentsPage from "../../Pages/AdminPages/DocumentsPage";
import SettingsPage from "../../Pages/AdminPages/SettingsPage";
import { useTheme } from "../Context/ThemeContext";


const AdminDashboard = ({ data, changeuser }) => {
const { theme } = useTheme();
  const [activePage, setActivePage] = useState("Dashboard");
  const [openTaskForm, setOpenTaskForm] = useState(false);
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
const [openEmployeeForm, setOpenEmployeeForm] = useState(false); 
const { userData, refreshData } = useContext(AuthContext);

  useEffect(() => {
    refreshData();
  }, []);

  const employees = userData?.employeesData || [];

  const totalEmployees = employees.length;

  const onLeaveToday = employees.filter(
    (e) => e.leaveStatus === "approved"
  ).length;

  const activeEmployees = totalEmployees - onLeaveToday;

  const savedDepartments = JSON.parse(
    localStorage.getItem("departmentData") || "[]"
  );

  const totalDepartments =
    savedDepartments.length ||
    [...new Set(employees.map((e) => e.department).filter(Boolean))].length;

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
      ? 0
      : parseFloat(
          ((activeEmployees / totalEmployees) * 100).toFixed(1)
        );

  const dashboardData = {
    totalEmployees,
    activeEmployees,
    onLeaveToday,
    totalDepartments,
    totalTasks,
    inProgressTasks,
    completedCount,
    monthlySalary: "$0",
    attendanceRate: `${attendanceRate}%`,
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
        <div className="p-5 ">
          <AIInsights
           sidebarCollapsed={sidebarCollapsed}
          />
        </div>
      );

    case "Employees":
      return (
        <div className="p-6 mt-20">
          <AdminEmployeesPage data={data} 
          sidebarCollapsed={sidebarCollapsed}
         />
        </div>
      );

    case "Attendance":
      return (
        <div className="p-5">
          < AttendanceDashboard
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
      return(
        <div>
         <EmployeeWellness
         sidebarCollapsed={sidebarCollapsed}
       />
        </div>
      );
case "Payroll & Finance":
  return(
    <div>
      <PayrollPage
        sidebarCollapsed={sidebarCollapsed}/>
    </div>
  );
  
  case "OKR & Goals":
    return(
      <div>
        <OKRPage
        sidebarCollapsed={sidebarCollapsed}/>
      </div>
    );

    case "Documents":
    return(
      <div>
        <DocumentsPage
         sidebarCollapsed={sidebarCollapsed}/>
      </div>
    );
    
    case "Settings":
      return(
        <div>
          <SettingsPage
           sidebarCollapsed={sidebarCollapsed}/>
        </div>
      );

  
      return (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[#f1f5f9] text-2xl font-semibold">
                Tasks
              </h1>

              <p className="text-[#64748b] text-sm mt-1">
                Track and manage all tasks
              </p>
            </div>

            <button
              onClick={() => setOpenTaskForm(true)}
              className="bg-[#3b82f6] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#2563eb]"
            >
              + Create Task
            </button>
          </div>

          <p className="text-[#64748b]">
            Tasks page content goes here.
          </p>
        </div>
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
   <div
  className="min-h-screen overflow-y-auto select-none"
  style={{
    backgroundColor: "var(--bg-primary)",
    color: "var(--text-primary)",
  }}
> {openTaskForm && (
        <CreateTask setOpenTaskForm={setOpenTaskForm} />
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
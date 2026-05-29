import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import AdminCards from "../Employees/AdminCards";
import AdminSidebar from "../layout/AdminSidebar";
import AdminEmployeeMessages from "../Employees/AdminEmployeeMessages";
import AdminTeamPerformance from "../Employees/AdminTeamPerformance";
import CreateTask from "../Tasks/CreateTask";
import CreateEmployee from "../Employees/CreateEmployee";
import AdminHeader from "../layout/AdminHeader";
import AdminEmployeesPage from "../../Pages/AdminEmployeesPage";
import AdminLeavePage from "../../Pages/AdminLeavePage";

const AdminDashboard = ({ data, changeuser }) => {
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("activePage") || "Overview";
  });

  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [openEmployeeForm, setOpenEmployeeForm] = useState(false);
  const { userData, refreshData } = useContext(AuthContext);

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  const employees = userData.employeesData || [];

  const totalEmployees = employees.length;

  const onLeaveToday = employees.filter(
    (e) => e.leaveStatus === "approved"
  ).length;

  const activeEmployees = totalEmployees - onLeaveToday;

  const departments = [
    ...new Set(employees.map((e) => e.department).filter(Boolean)),
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

  const completedTasks =
    totalTasks === 0 ? 0 : Math.floor((completedCount / totalTasks) * 100);

  const monthlySalary = "$0";

  const attendanceRate =
    totalEmployees === 0
      ? "0%"
      : `${(
          ((totalEmployees - onLeaveToday) / totalEmployees) *
          100
        ).toFixed(1)}%`;

  const dashboardData = {
    totalEmployees,
    activeEmployees,
    onLeaveToday,
    totalDepartments,
    totalTasks,
    inProgressTasks,
    completedTasks,
    monthlySalary,
    attendanceRate,
  };

  const renderPage = () => {
    if (activePage === "Overview")
      return (
        <>
          <AdminHeader
            setOpenTaskForm={setOpenTaskForm}
            setOpenEmployeeForm={setOpenEmployeeForm}
            changeuser={changeuser}
            data={data}
          />

          <AdminCards data={dashboardData} />

          <div className="flex gap-4 px-4 pb-6 ml-52">
            <AdminTeamPerformance data={userData} />
            <AdminEmployeeMessages />
          </div>
        </>
      );

    if (activePage === "Employees")
      return (
        <div className="ml-52 p-6">
          <AdminEmployeesPage data={data} />
        </div>
      );

    if (activePage === "Tasks")
      return (
        <div className="ml-52 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[#f1f5f9] text-2xl font-semibold">Tasks</h1>
              <p className="text-[#64748b] text-sm mt-1">
                Track and manage all tasks
              </p>
            </div>

            <button
              onClick={() => setOpenTaskForm(true)}
              className="bg-[#3b82f6] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#2563eb] transition-all"
            >
              + Create Task
            </button>
          </div>

          <p className="text-[#64748b]">Tasks page content goes here.</p>
        </div>
      );

    if (activePage === "Leaves") {
      return <AdminLeavePage />;
    }

    return (
      <>
        <AdminHeader
          setOpenTaskForm={setOpenTaskForm}
          setOpenEmployeeForm={setOpenEmployeeForm}
          changeuser={changeuser}
          data={data}
        />

        <AdminCards data={dashboardData} />

        <div className="flex gap-4 px-4 pb-6 ml-52">
          <AdminTeamPerformance data={userData} />
          <AdminEmployeeMessages />
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] overflow-hidden select-none">
      {openTaskForm && (
        <CreateTask setOpenTaskForm={setOpenTaskForm} />
      )}

      {openEmployeeForm && (
        <CreateEmployee setOpenEmployeeForm={setOpenEmployeeForm} />
      )}

      <AdminSidebar
        data={data}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {renderPage()}
    </div>
  );
};

export default AdminDashboard;
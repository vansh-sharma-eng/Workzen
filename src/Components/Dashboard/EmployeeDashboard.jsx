import { useState, useEffect, useCallback } from "react";

// Layout Imports
import EmployeeHeader from "../layout/Employee/EmployeeHeader";
import EmployeeSidebar from "../layout/Employee/EmployeeSidebar";

// Task Imports
import TaskNumber from "../Tasks/TaskNumber";
import EmployeeTask from "../Tasks/EmployeeTask";
import FilterTask from "../Tasks/FilterTask";
import taskApi from "../../api/taskApi";

// Dashboard Imports
import ActiveTasks from "../Employee/EmployeeDashboard/ActiveTasks";
import WeeklyGlance from "../Employee/EmployeeDashboard/WeeklyGlance";
import RecentActivity from "../Employee/EmployeeDashboard/RecentActivity";

// Page Imports
import MyLeave from "../Admin/CreateEmployees/MyLeave";
import EmployeeAttendanceDashboard from "../../Pages/EmployeePages/EmployeeAttendanceDashboard";
import ProfilePage from "../../Pages/ProfilePage";
import SettingsPage from "../../Pages/EmployeePages/SettingsPage";

/** Maps a backend TaskDto (status: TODO|IN_PROGRESS|COMPLETED|FAILED) onto the
 * boolean-flag shape (newTask/active/completed/failed) this page's UI was built around. */
const adaptTask = (dto) => {
  const catMatch = /^\[(.+?)\]\s*(.*)$/s.exec(dto.description || "");
  return {
    id: dto.id,
    title: dto.title,
    description: catMatch ? catMatch[2] : dto.description || "",
    category: catMatch ? catMatch[1] : "General",
    date: dto.dueDate || "",
    priority: dto.priority,
    newTask: dto.status === "TODO",
    active: dto.status === "IN_PROGRESS",
    completed: dto.status === "COMPLETED",
    failed: dto.status === "FAILED",
  };
};

const taskNumberFrom = (tasks) => ({
  total: tasks.length,
  inProgress: tasks.filter((t) => t.active).length,
  completed: tasks.filter((t) => t.completed).length,
  failed: tasks.filter((t) => t.failed).length,
  newTask: tasks.filter((t) => t.newTask).length,
});

const EmployeeDashboard = ({ data, changeuser, handleLogout: signOut, onUserUpdate }) => {
  const [activePage, setActivePage] = useState("Overview");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasksError, setTasksError] = useState("");

  const [employeeData, setEmployeeData] = useState(() => ({
    ...data,
    isActive: data?.isActive ?? true,
    notifications: data?.notifications || [],
    tasks: [],
    taskNumber: taskNumberFrom([]),
  }));

  const syncToStorage = (updated) => {
    setEmployeeData(updated);
    const all = JSON.parse(localStorage.getItem("employeeData")) || [];
    const updatedAll = all.map((emp) =>
      emp.email === updated.email ? updated : emp
    );
    localStorage.setItem("employeeData", JSON.stringify(updatedAll));
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ role: "employee", data: updated })
    );
  };

  const loadTasks = useCallback(async () => {
    if (!data?.id) return;
    setTasksLoading(true);
    setTasksError("");
    try {
      const result = await taskApi.getForEmployee(data.id);
      const tasks = (result || []).map(adaptTask);
      setEmployeeData((prev) => ({ ...prev, tasks, taskNumber: taskNumberFrom(tasks) }));
    } catch (err) {
      setTasksError(err.message || "Couldn't load your tasks.");
    } finally {
      setTasksLoading(false);
    }
  }, [data]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mirror to localStorage on mount
    syncToStorage({ ...employeeData, isActive: true });
  }, []);

  const handleLogout = () => {
    // Real sign-out: clears the JWT session so a page reload doesn't
    // silently log the person back in. This must run, not just the
    // local bookkeeping below.
    signOut?.();
  };

  // Leave requests are handled entirely inside MyLeave.jsx via the real /api/leaves backend now —
  // no local mock state needed here. Notifications are likewise real now, fetched directly inside
  // EmployeeHeader via useNotifications() — no local mock state or props needed here either.

  /** Applies a new status to a task both optimistically (local UI) and against the real backend. */
  const changeTaskStatus = async (taskId, status) => {
    setEmployeeData((prev) => {
      const tasks = prev.tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              newTask: status === "TODO",
              active: status === "IN_PROGRESS",
              completed: status === "COMPLETED",
              failed: status === "FAILED",
            }
          : t
      );
      return { ...prev, tasks, taskNumber: taskNumberFrom(tasks) };
    });

    try {
      await taskApi.update(taskId, { status });
    } catch (err) {
      setTasksError(err.message || "Couldn't update this task.");
      loadTasks();
    }
  };

  const completeTask = (taskId) => changeTaskStatus(taskId, "COMPLETED");
  const failedTask = (taskId) => changeTaskStatus(taskId, "FAILED");
  const reopenTask = (taskId) => changeTaskStatus(taskId, "IN_PROGRESS");
  const acceptTask = (taskId) => changeTaskStatus(taskId, "IN_PROGRESS");
  const rejectTask = (taskId) => changeTaskStatus(taskId, "FAILED");

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();
  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const renderPage = () => {
    switch (activePage) {
      case "Overview":
        return (
          <>
            <div className="px-6 py-1 mt-3">
              <h1 className="text-2xl font-semibold">
                {greeting}, {employeeData.Name || employeeData.name} 👋
              </h1>
              <h5 className="text-xs mt-0.5 text-gray-500 font-medium">
                {todayLabel}
              </h5>
            </div>
            <div className="p-6">
              <TaskNumber data={employeeData} />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mt-6">
                <ActiveTasks tasks={employeeData.tasks} loading={tasksLoading} />
                <WeeklyGlance employeeId={data?.id} />
              </div>
              <div className="mt-6">
                <RecentActivity />
              </div>
            </div>
          </>
        );

      case "My Tasks":
        return (
          <div className="flex flex-col p-6">
            <TaskNumber data={employeeData} />
            {tasksError && (
              <p className="mt-4 text-sm text-red-400">{tasksError}</p>
            )}
            <div className="mt-6">
              <FilterTask
                data={employeeData.taskNumber}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
              {tasksLoading ? (
                <p className="text-slate-500 text-center mt-10">Loading your tasks…</p>
              ) : (
                <EmployeeTask
                  data={employeeData}
                  activeFilter={activeFilter}
                  completeTask={completeTask}
                  failedTask={failedTask}
                  reopenTask={reopenTask}
                  acceptTask={acceptTask}
                  rejectTask={rejectTask}
                />
              )}
            </div>
          </div>
        );

      case "My Leave":
        return (
          <div className="p-1">
            <MyLeave data={employeeData} />
          </div>
        );

      case "My Attendance":
        return (
          <div className="p-6">
            <EmployeeAttendanceDashboard data={employeeData} />
          </div>
        );

      case "Profile":
        return (
          <div className="p-6">
            <ProfilePage data={data} onUpdate={onUserUpdate} />
          </div>
        );

      case "Settings":
        return <SettingsPage data={data} />;

      default:
        return (
          <div className="flex justify-center items-center h-[70vh]">
            <p className="text-slate-500 text-lg">Page not found</p>
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-screen select-none flex"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <EmployeeSidebar
        data={employeeData}
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 overflow-hidden ${
          sidebarCollapsed ? "ml-16" : "ml-56"
        }`}
      >
        <EmployeeHeader
          activePage={activePage}
          setActivePage={setActivePage}
          changeuser={changeuser}
          data={employeeData}
          isSidebarCollapsed={sidebarCollapsed}
          handleLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto pt-16">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
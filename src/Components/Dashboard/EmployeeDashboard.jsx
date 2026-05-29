import { useState, useEffect } from "react";
import EmployeeHeader from "../layout/EmployeeHeader";
import EmployeeSidebar from "../layout/EmployeeSidebar";
import TaskNumber from "../tasks/TaskNumber";
import EmployeeTask from "../tasks/EmployeeTask";
import FilterTask from "../tasks/FilterTask";
import MyLeave from "../Employees/MyLeave";

const EmployeeDashboard = ({ data, changeuser }) => {
  const [activePage, setActivePage] = useState("Overview");
  const [activeFilter, setActiveFilter] = useState("all");

  const [employeeData, setEmployeeData] = useState(() => {
    const tasks = data?.tasks || [];
    return {
      ...data,
      isActive: data?.isActive ?? true,
      leaveStatus: data?.leaveStatus || "none",
      leaveRequests: data?.leaveRequests || [],
      notifications: data?.notifications || [],
      tasks,
      taskNumber: {
        total: tasks.length,
        inProgress: tasks.filter((t) => t.active).length,
        completed: tasks.filter((t) => t.completed).length,
        failed: tasks.filter((t) => t.failed).length,
        newTask: tasks.filter((t) => t.newTask).length,
      },
    };
  });

  useEffect(() => {
    if (employeeData.leaveStatus !== "approved") {
      syncToStorage({ ...employeeData, isActive: true });
    }
  }, []);

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

  const handleLogout = () => {
    const updated = { ...employeeData, isActive: false };
    const all = JSON.parse(localStorage.getItem("employeeData")) || [];
    localStorage.setItem(
      "employeeData",
      JSON.stringify(
        all.map((emp) => (emp.email === updated.email ? updated : emp))
      )
    );
    localStorage.setItem("loggedInUser", "");
    changeuser("");
  };

  const applyLeave = (leaveData) => {
    const newRequest = {
      id: Date.now(),
      ...leaveData,
      status: "pending",
      appliedOn: new Date().toISOString(),
    };
    const updated = {
      ...employeeData,
      leaveStatus: "pending",
      leaveRequests: [...(employeeData.leaveRequests || []), newRequest],
    };
    syncToStorage(updated);

    const adminNotifs =
      JSON.parse(localStorage.getItem("adminNotifications")) || [];
    adminNotifs.push({
      id: Date.now(),
      employeeName: employeeData.Name,
      message: `${employeeData.Name} applied for ${leaveData.leaveType} leave.`,
      date: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem("adminNotifications", JSON.stringify(adminNotifs));
  };

  const cancelLeave = (leaveId, leaveType) => {
    const updatedRequests = employeeData.leaveRequests.map((r) =>
      r.id === leaveId ? { ...r, status: "cancelled" } : r
    );
    const hasPending = updatedRequests.some((r) => r.status === "pending");
    syncToStorage({
      ...employeeData,
      leaveStatus: hasPending ? "pending" : "none",
      leaveRequests: updatedRequests,
    });

    const adminNotifs =
      JSON.parse(localStorage.getItem("adminNotifications")) || [];
    adminNotifs.push({
      id: Date.now(),
      employeeName: employeeData.Name,
      message: `${employeeData.Name} has cancelled their ${leaveType} leave request.`,
      date: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem("adminNotifications", JSON.stringify(adminNotifs));
  };

  const unreadNotifications =
    employeeData.notifications?.filter((n) => !n.read).length || 0;

  const markNotificationsRead = () => {
    syncToStorage({
      ...employeeData,
      notifications: employeeData.notifications.map((n) => ({
        ...n,
        read: true,
      })),
    });
  };

  const clearNotifications = () => {
    syncToStorage({ ...employeeData, notifications: [] });
  };

  const completeTask = (index) => {
    const tasks = [...employeeData.tasks];
    if (tasks[index].completed || tasks[index].failed) return;
    tasks[index] = {
      ...tasks[index],
      active: false,
      completed: true,
      failed: false,
      newTask: false,
    };
    syncToStorage({
      ...employeeData,
      tasks,
      taskNumber: {
        ...employeeData.taskNumber,
        completed: employeeData.taskNumber.completed + 1,
        inProgress: employeeData.taskNumber.inProgress - 1,
      },
    });
  };

  const failedTask = (index) => {
    const tasks = [...employeeData.tasks];
    if (tasks[index].completed || tasks[index].failed) return;
    tasks[index] = {
      ...tasks[index],
      active: false,
      completed: false,
      failed: true,
      newTask: false,
    };
    syncToStorage({
      ...employeeData,
      tasks,
      taskNumber: {
        ...employeeData.taskNumber,
        failed: employeeData.taskNumber.failed + 1,
        inProgress: employeeData.taskNumber.inProgress - 1,
      },
    });
  };

  const reopenTask = (index) => {
    const tasks = [...employeeData.tasks];
    if (tasks[index].active) return;
    const wasFailed = tasks[index].failed;
    const wasCompleted = tasks[index].completed;
    tasks[index] = {
      ...tasks[index],
      active: true,
      completed: false,
      failed: false,
      newTask: false,
    };
    syncToStorage({
      ...employeeData,
      tasks,
      taskNumber: {
        ...employeeData.taskNumber,
        inProgress: employeeData.taskNumber.inProgress + 1,
        failed: wasFailed
          ? employeeData.taskNumber.failed - 1
          : employeeData.taskNumber.failed,
        completed: wasCompleted
          ? employeeData.taskNumber.completed - 1
          : employeeData.taskNumber.completed,
      },
    });
  };

  const acceptTask = (index) => {
    const tasks = [...employeeData.tasks];
    if (!tasks[index].newTask) return;
    tasks[index] = {
      ...tasks[index],
      active: true,
      newTask: false,
      completed: false,
      failed: false,
    };
    syncToStorage({
      ...employeeData,
      tasks,
      taskNumber: {
        ...employeeData.taskNumber,
        inProgress: employeeData.taskNumber.inProgress + 1,
        newTask: employeeData.taskNumber.newTask - 1,
      },
    });
  };

  const rejectTask = (index) => {
    const tasks = [...employeeData.tasks];
    if (!tasks[index].newTask) return;
    tasks[index] = {
      ...tasks[index],
      active: false,
      newTask: false,
      completed: false,
      failed: true,
    };
    syncToStorage({
      ...employeeData,
      tasks,
      taskNumber: {
        ...employeeData.taskNumber,
        failed: employeeData.taskNumber.failed + 1,
        newTask: employeeData.taskNumber.newTask - 1,
      },
    });
  };

  const renderPage = () => {
    if (activePage === "Overview")
      return (
        <div className="flex flex-col object-contain -ml-5 ">
          <TaskNumber data={employeeData} />
          <div className="-ml-33">
             <FilterTask
            data={employeeData.taskNumber}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <EmployeeTask
            data={employeeData}
            activeFilter={activeFilter}
            completeTask={completeTask}
            failedTask={failedTask}
            reopenTask={reopenTask}
            acceptTask={acceptTask}
            rejectTask={rejectTask}
          />
          </div>
        </div>
      );

    if (activePage === "My Leave")
      return (
        <MyLeave
          employeeData={employeeData}
          applyLeave={applyLeave}
          cancelLeave={cancelLeave}
        />
      );

    return (
      <div className="flex items-center justify-center py-24 text-slate-600 text-sm">
        Coming soon
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 select-none flex">
  <EmployeeSidebar
        data={employeeData}
        activePage={activePage}
        setActivePage={setActivePage}
      />

     <div className="flex flex-col flex-1 min-h-screen ml-56 overflow-hidden">
        <EmployeeHeader
          data={employeeData}
          handleLogout={handleLogout}
          unreadNotifications={unreadNotifications}
          markNotificationsRead={markNotificationsRead}
          clearNotifications={clearNotifications}
        />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
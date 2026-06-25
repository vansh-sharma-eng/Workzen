import React, { useEffect, useState } from "react";
import dashboardService from "../../services/dashboardService";

import StatsSection from "./StatsSection";
import AttendanceCard from "./AttendanceCard";
import PendingActions from "./PendingActions";
import DepartmentStrength from "./DepartmentStrength";
import RecentActivity from "./RecentActivity";

const DashboardContainer = () => {
  const [stats, setStats] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [actions, setActions] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statsData = await dashboardService.getStats();
      const attendanceData = await dashboardService.getAttendance();
      const departmentData = await dashboardService.getDepartments();
      const actionData = await dashboardService.getPendingActions();
      const activityData = await dashboardService.getRecentActivities();

      setStats(statsData);
      setAttendance(attendanceData);
      setDepartments(departmentData);
      setActions(actionData);
      setActivities(activityData);
    } catch (error) {
      console.error("Failed to load dashboard", error);
    }
  };

  return (
    <>
      <StatsSection data={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <AttendanceCard data={attendance} />
        <PendingActions data={actions} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <DepartmentStrength data={departments} />
        <RecentActivity data={activities} />
      </div>
    </>
  );
};

export default DashboardContainer;
import React, { useState } from "react";

import HRHeader from "../layout/HR/HRHeader";
import HRSidebar from "../layout/HR/HRSidebar";

import WelcomeBanner from "../HR/HrDashboard/WelcomeBanner";
import StatsSection from "../HR/HrDashboard/StatsSection";
import EmployeeAttendanceCard from "../HR/HrDashboard/EmployeeAttendanceCard";
import PendingActions from "../HR/HrDashboard/PendingActions";
import DepartmentStrength from "../HR/HrDashboard/DepartmentStrength";
import RecentActivity from "../HR/HrDashboard/RecentActivity";
import Employees from "../HR/Employee/Employees";
import AttendanceDashboard from "../../Pages/HRPages/AttendanceDashboard";
import EmployeeAttendanceDashboard from "../../Pages/EmployeePages/EmployeeAttendanceDashboard";
import LeaveManagement from "../../Pages/HRPages/LeaveManagement";
import Tasks from "../../Pages/HRPages/Tasks";
import ProfilePage from "../../Pages/ProfilePage";
import SettingsPage from "../../Pages/HRPages/SettingsPage";
import { useHrOverview } from "../../Utils/useHrOverview";


const HRDashboard = ({ data, changeuser, handleLogout, onUserUpdate }) => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const overview = useHrOverview(data?.id);

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <>
              <WelcomeBanner data={data} />

            <div className="mt-6">
              <StatsSection
                team={overview.team}
                attendanceRate={overview.attendanceRate}
                pendingCount={overview.pendingLeaves.length + overview.pendingWfh.length}
                departmentCount={overview.departmentStrength.length}
                loading={overview.loading}
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
              <EmployeeAttendanceCard breakdown={overview.attendanceBreakdown} loading={overview.loading} />
              <PendingActions
                leaves={overview.pendingLeaves}
                wfhRequests={overview.pendingWfh}
                loading={overview.loading}
                onDecided={overview.refresh}
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
              <DepartmentStrength data={overview.departmentStrength} loading={overview.loading} />
              <RecentActivity />
            </div>
          
          </>
        );

      case "Employees":
        return <Employees data={data} />;
     
        

      case "Attendance":
        return <AttendanceDashboard data={data}/>

      case "My Attendance":
        return (
          <div className="p-6">
            <EmployeeAttendanceDashboard data={data} />
          </div>
        );

      case "Leave Management":
        return <LeaveManagement data={data}/>

      case "Profile":
        return <ProfilePage data={data} onUpdate={onUserUpdate} />;

      case "Create Task":
        return <Tasks data={data} />

      case "Settings":
        return <SettingsPage data={data} />;

      default:
        return (
          <>
            <WelcomeBanner />

            <div className="mt-6">
              <StatsSection />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
              <EmployeeAttendanceCard />
              <PendingActions />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
              <DepartmentStrength />
              <RecentActivity />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0F111A] text-white">
      {/* Sidebar */}
      <HRSidebar
        data={data}
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Header */}
      <HRHeader
        activePage={activePage}
        setActivePage={setActivePage}
        changeuser={changeuser}
        handleLogout={handleLogout}
        data={data}
        isSidebarCollapsed={sidebarCollapsed}
      />

      
      <main
        className={`transition-all duration-300 pt-20 p-6 ${
          sidebarCollapsed ? "ml-17" : "ml-55"
        }`}
      >
        {renderPage()}
      </main>
    </div>
  );
};

export default HRDashboard;
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

const HRDashboard = ({ data, changeuser }) => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
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

      case "Employees":
        return <Employees />;
     
        

      case "Attendance":
        return <AttendanceDashboard/>
      case "Leave Management":
        return <h1 className="text-2xl font-bold">Leave Management</h1>;

      case "Recruitment":
        return <h1 className="text-2xl font-bold">Recruitment</h1>;

      case "Payroll":
        return <h1 className="text-2xl font-bold">Payroll</h1>;

      case "Performance":
        return <h1 className="text-2xl font-bold">Performance</h1>;

      case "Documents":
        return <h1 className="text-2xl font-bold">Documents</h1>;

      case "Settings":
        return <h1 className="text-2xl font-bold">Settings</h1>;

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
        changeuser={changeuser}
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
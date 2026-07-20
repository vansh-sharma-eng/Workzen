// src/Pages/SettingsPage.jsx

import React from "react";
import CompanyProfile from "../../Components/Admin/Settings/CompanyProfile"
import OfficeLocationMap from "../../Components/Admin/Settings/OfficeLocationMap"
import LeavePolicyCard from "../../Components/Admin/Settings/LeavePolicyCard"
import NotificationPreferences from "../../Components/Admin/Settings/NotificationPreferences"
import AccessSecurity from "../../Components/Admin/Settings/AccessSecurity";
import DangerZone from "../../Components/Admin/Settings/DangerZone";

const SettingsPage = ({ sidebarCollapsed, data}) => {
  return (
     <div className={`
      transition-all duration-300
      ${
        sidebarCollapsed
          ? "ml-16 w-[calc(114%)]"
          : "ml-54 w-[calc(102%)]"
      }
    `}>
      
    <div className="min-h-screen w-[82%] mt-16 bg-[#050816] p-6">
      <div className="max-w-6xl space-y-6">
        <CompanyProfile  sidebarCollapsed={sidebarCollapsed}/>
        <OfficeLocationMap />
        <LeavePolicyCard />
        <NotificationPreferences data={data} />
        <AccessSecurity data={data} />
        <DangerZone />
      </div>
    </div>
    </div>
  );
};

export default SettingsPage;
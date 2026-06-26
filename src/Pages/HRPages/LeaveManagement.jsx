import React, { useState } from "react";

import LeaveTabs from "../../Components/HR/Leave/LeaveTabs";
import LeaveGrid from "../../Components/HR/Leave/LeaveGrid";
import LeaveTable from "../../Components/HR/Leave/LeaveTable";
import TeamCalendar from "../../Components/HR/Leave/TeamCalendar";
import LeavePolicy from "../../Components/HR/Leave/LeavePolicy";

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const renderContent = () => {
    switch (activeTab) {
      case "pending":
        return <LeaveGrid status="Pending" />;

      case "approved":
        return <LeaveGrid status="Approved" />;

      case "rejected":
        return <LeaveGrid status="Rejected" />;

      case "all":
        return <LeaveTable />;

      case "calendar":
        return <TeamCalendar />;

      case "policy":
        return <LeavePolicy />;

      default:
        return <LeaveGrid status="Pending" />;
    }
  };

  return (
    <div className="space-y-6">
      <LeaveTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {renderContent()}
    </div>
  );
};

export default LeaveManagement;
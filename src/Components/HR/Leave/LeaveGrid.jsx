import React from "react";
import LeaveCard from "./LeaveCard";
import { leaveRequests } from "../../../data/HrData/leaveData";

const LeaveGrid = ({ activeTab }) => {
  const filteredLeaves = leaveRequests.filter((leave) => {
    switch (activeTab) {
      case "pending":
        return leave.status.toLowerCase() === "pending";

      case "approved":
        return leave.status.toLowerCase() === "approved";

      case "rejected":
        return leave.status.toLowerCase() === "rejected";

      case "all":
        return true;

      default:
        return true;
    }
  });

  if (filteredLeaves.length === 0) {
    return (
      <div className="rounded-xl border border-[#262626] bg-[#141414] py-16 text-center text-gray-400">
        No leave requests found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {filteredLeaves.map((leave) => (
        <LeaveCard key={leave.id} leave={leave} />
      ))}
    </div>
  );
};

export default LeaveGrid;
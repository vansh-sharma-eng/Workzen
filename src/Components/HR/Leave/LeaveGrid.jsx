import React from "react";
import LeaveCard from "./LeaveCard";

/** @param {{leaves, onApprove, onReject}} props — leaves is a pre-filtered LeaveDto array. */
const LeaveGrid = ({ leaves, onApprove, onReject }) => {
  if (!leaves || leaves.length === 0) {
    return (
      <div className="rounded-xl border border-[#262626] bg-[#141414] py-16 text-center text-gray-400">
        No leave requests found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {leaves.map((leave) => (
        <LeaveCard
          key={leave.id}
          leave={leave}
          onApprove={leave.status === "PENDING" ? onApprove : undefined}
          onReject={leave.status === "PENDING" ? onReject : undefined}
        />
      ))}
    </div>
  );
};

export default LeaveGrid;

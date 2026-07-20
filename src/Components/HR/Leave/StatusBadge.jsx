import React from "react";

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-amber-500/15 text-amber-400",
    Approved: "bg-emerald-500/15 text-emerald-400",
    Rejected: "bg-red-500/15 text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold ${
        styles[status] || "bg-gray-700 text-gray-300"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
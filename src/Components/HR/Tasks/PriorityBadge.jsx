import React from "react";
import { AlertTriangle } from "lucide-react";

const PriorityBadge = ({ priority }) => {
  const styles = {
    Urgent: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/30",
    },
    High: {
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      border: "border-orange-500/30",
    },
    Medium: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      border: "border-yellow-500/30",
    },
    Low: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
    },
  };

  const current =
    styles[priority] || {
      bg: "bg-gray-500/10",
      text: "text-gray-400",
      border: "border-gray-500/30",
    };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold border ${current.bg} ${current.text} ${current.border}`}
    >
      <AlertTriangle size={13} />
      {priority}
    </span>
  );
};

export default PriorityBadge;
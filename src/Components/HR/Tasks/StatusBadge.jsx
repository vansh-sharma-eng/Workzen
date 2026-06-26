import React from "react";
import {
  Circle,
  LoaderCircle,
  Eye,
  CircleCheckBig,
} from "lucide-react";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    "To Do": {
      icon: Circle,
      bg: "bg-slate-500/10",
      text: "text-slate-400",
      border: "border-slate-500/30",
    },

    "In Progress": {
      icon: LoaderCircle,
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/30",
    },

    "In Review": {
      icon: Eye,
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/30",
    },

    Done: {
      icon: CircleCheckBig,
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
    },
  };

  const current =
    statusConfig[status] || statusConfig["To Do"];

  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium border ${current.bg} ${current.text} ${current.border}`}
    >
      <Icon size={14} />
      {status}
    </span>
  );
};

export default StatusBadge;
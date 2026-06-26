import React from "react";
import { Info, AlertTriangle, ShieldAlert } from "lucide-react";

const PriorityBadge = ({ type }) => {
  const badgeConfig = {
    Info: {
      icon: Info,
      text: "Info",
      className:
        "bg-blue-500/10 text-blue-400 border border-blue-500/30",
    },

    Important: {
      icon: AlertTriangle,
      text: "Important",
      className:
        "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
    },

    Urgent: {
      icon: ShieldAlert,
      text: "Urgent",
      className:
        "bg-red-500/10 text-red-400 border border-red-500/30",
    },
  };

  const badge = badgeConfig[type] || badgeConfig.Info;
  const Icon = badge.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${badge.className}`}
    >
      <Icon size={14} />
      {badge.text}
    </span>
  );
};

export default PriorityBadge;
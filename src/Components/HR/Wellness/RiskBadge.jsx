import React from "react";
import { AlertTriangle, ShieldCheck, AlertCircle } from "lucide-react";

const RiskBadge = ({ risk }) => {
  const config = {
    Low: {
      bg: "bg-emerald-500/15",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      icon: ShieldCheck,
    },
    Medium: {
      bg: "bg-amber-500/15",
      text: "text-amber-400",
      border: "border-amber-500/20",
      icon: AlertCircle,
    },
    High: {
      bg: "bg-red-500/15",
      text: "text-red-400",
      border: "border-red-500/20",
      icon: AlertTriangle,
    },
    Critical: {
      bg: "bg-red-600/20",
      text: "text-red-500",
      border: "border-red-600/30",
      icon: AlertTriangle,
    },
  };

  const current = config[risk] || config.Low;
  const Icon = current.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 border ${current.bg} ${current.border}`}
    >
      <Icon size={14} className={current.text} />
      <span className={`text-xs font-semibold ${current.text}`}>
        {risk} Risk
      </span>
    </div>
  );
};

export default RiskBadge;
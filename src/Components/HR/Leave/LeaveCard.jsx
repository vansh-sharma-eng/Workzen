import React from "react";
import {
  Calendar,
  Clock,
  AlertTriangle,
  Check,
  X,
  MessageCircle,
} from "lucide-react";

const LeaveCard = ({ leave }) => {
  const getBadgeStyle = (type) => {
    switch (type) {
      case "Annual Leave":
        return "bg-emerald-500/15 text-emerald-400";
      case "Casual Leave":
        return "bg-amber-500/15 text-amber-400";
      case "WFH":
        return "bg-blue-500/15 text-blue-400";
      case "Sick Leave":
        return "bg-red-500/15 text-red-400";
      default:
        return "bg-gray-500/15 text-gray-300";
    }
  };

  return (
    <div className="bg-[#14151c] border border-[#272727] rounded-xl p-5 h-[260px] flex flex-col hover:border-[#3a3a3a] transition-all w-full">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
            style={{ background: leave.avatarColor }}
          >
            {leave.initials}
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{leave.name}</h3>
            <p className="text-gray-400 text-xs">{leave.department}</p>
          </div>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ${getBadgeStyle(leave.leaveType)}`}
        >
          {leave.leaveType}
        </span>
      </div>

      {/* Content */}
      <div className="mt-5 flex-1 min-h-0 space-y-2">
        <div className="flex items-center text-xs gap-2 text-gray-300">
          <Calendar size={13} className="flex-shrink-0" />
          <span>
            {leave.startDate} — {leave.endDate}
          </span>
          <span className="text-gray-500">({leave.duration})</span>
        </div>

        <div className="flex items-start text-xs gap-2 text-gray-300">
          <Clock size={13} className="mt-0.5 flex-shrink-0 text-gray-400" />
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Reason</p>
            <p className="text-white text-xs">{leave.reason}</p>
          </div>
        </div>

        <p className="text-xs text-gray-500">Applied {leave.appliedDate}</p>
      </div>

      {/* Bottom: warning + actions pinned to bottom */}
      <div className="mt-auto pt-2">
        {leave.warning && (
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-md px-2 py-1.5 mb-3">
            <AlertTriangle size={12} className="text-amber-400 flex-shrink-0" />
            <span className="text-amber-300 text-xs">{leave.warning}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center gap-1.5 px-3 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium transition-colors">
            <Check size={13} />
            Approve
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 h-8 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors">
            <X size={13} />
            Reject
          </button>
          <button className="w-8 h-8 rounded-xl bg-[#1A1A1A] hover:bg-[#262626] text-gray-300 flex items-center justify-center transition-colors">
            <MessageCircle size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default LeaveCard;
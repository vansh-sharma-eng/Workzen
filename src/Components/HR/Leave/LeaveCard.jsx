import React, { useState } from "react";
import { Calendar, Clock, Check, X, Loader2 } from "lucide-react";

const TYPE_LABEL = { SICK: "Sick Leave", CASUAL: "Casual Leave", PAID: "Paid Leave", UNPAID: "Unpaid Leave" };
const TYPE_BADGE = {
  SICK: "bg-red-500/15 text-red-400",
  CASUAL: "bg-amber-500/15 text-amber-400",
  PAID: "bg-emerald-500/15 text-emerald-400",
  UNPAID: "bg-blue-500/15 text-blue-400",
};

const initialsOf = (name) => {
  const parts = (name || "").trim().split(/\s+/);
  return `${parts[0]?.[0] || ""}${parts[1]?.[0] || ""}`.toUpperCase() || "?";
};

const colorFor = (id) => {
  const colors = ["#7C3AED", "#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#0EA5E9"];
  return colors[(id || 0) % colors.length];
};

const durationOf = (from, to) => {
  const days = Math.round((new Date(to) - new Date(from)) / 86400000) + 1;
  return `${days} day${days === 1 ? "" : "s"}`;
};

/** @param {{leave, onApprove?, onReject?, onCancel?}} props — leave is a LeaveDto from the backend. */
const LeaveCard = ({ leave, onApprove, onReject, onCancel }) => {
  const [busy, setBusy] = useState(false);

  const run = async (fn) => {
    setBusy(true);
    try { await fn(leave.id); } finally { setBusy(false); }
  };

  return (
    <div className="bg-[#14151c] border border-[#272727] rounded-xl p-5 min-h-[220px] flex flex-col hover:border-[#3a3a3a] transition-all w-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
            style={{ background: colorFor(leave.employeeId) }}
          >
            {initialsOf(leave.employeeName)}
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{leave.employeeName}</h3>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ${TYPE_BADGE[leave.type] || "bg-gray-500/15 text-gray-300"}`}>
          {TYPE_LABEL[leave.type] || leave.type}
        </span>
      </div>

      {/* Content */}
      <div className="mt-5 flex-1 min-h-0 space-y-2">
        <div className="flex items-center text-xs gap-2 text-gray-300">
          <Calendar size={13} className="flex-shrink-0" />
          <span>{leave.fromDate} — {leave.toDate}</span>
          <span className="text-gray-500">({durationOf(leave.fromDate, leave.toDate)})</span>
        </div>

        <div className="flex items-start text-xs gap-2 text-gray-300">
          <Clock size={13} className="mt-0.5 flex-shrink-0 text-gray-400" />
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Reason</p>
            <p className="text-white text-xs">{leave.reason || "—"}</p>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Applied {leave.appliedAt ? new Date(leave.appliedAt).toLocaleDateString() : "—"}
        </p>

        {leave.decidedByName && (
          <p className="text-xs text-gray-500">By {leave.decidedByName}</p>
        )}
      </div>

      {/* Actions pinned to bottom */}
      <div className="mt-auto pt-2">
        <div className="flex items-center gap-2">
          {leave.status === "PENDING" && onApprove && onReject && (
            <>
              <button
                onClick={() => run(onApprove)}
                disabled={busy}
                className="flex items-center justify-center gap-1.5 px-3 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium transition-colors disabled:opacity-60"
              >
                {busy ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                Approve
              </button>
              <button
                onClick={() => run(onReject)}
                disabled={busy}
                className="flex items-center justify-center gap-1.5 px-3 h-8 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors disabled:opacity-60"
              >
                <X size={13} />
                Reject
              </button>
            </>
          )}
          {leave.status === "PENDING" && onCancel && (
            <button
              onClick={() => run(onCancel)}
              disabled={busy}
              className="flex items-center justify-center gap-1.5 px-3 h-8 rounded-xl bg-[#1A1A1A] hover:bg-[#262626] text-gray-300 text-xs font-medium transition-colors disabled:opacity-60"
            >
              {busy ? <Loader2 size={13} className="animate-spin" /> : <X size={13} />}
              Withdraw
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveCard;

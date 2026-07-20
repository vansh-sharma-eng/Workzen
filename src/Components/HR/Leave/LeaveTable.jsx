import React, { useMemo, useState } from "react";
import { Search, Check, X, Loader2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

const TYPE_LABEL = { SICK: "Sick Leave", CASUAL: "Casual Leave", PAID: "Paid Leave", UNPAID: "Unpaid Leave" };

const initialsOf = (name) => {
  const parts = (name || "").trim().split(/\s+/);
  return `${parts[0]?.[0] || ""}${parts[1]?.[0] || ""}`.toUpperCase() || "?";
};
const colorFor = (id) => {
  const colors = ["#7C3AED", "#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#0EA5E9"];
  return colors[(id || 0) % colors.length];
};
const titleCase = (s) => (s ? s[0] + s.slice(1).toLowerCase() : s);

/** @param {{leaves, onApprove, onReject}} props — leaves is the full LeaveDto array for this scope (team or company). */
const LeaveTable = ({ leaves, onApprove, onReject }) => {
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState(null);

  const filteredData = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return leaves;
    return (leaves || []).filter((leave) =>
      (leave.employeeName || "").toLowerCase().includes(q) ||
      (leave.type || "").toLowerCase().includes(q) ||
      (leave.reason || "").toLowerCase().includes(q)
    );
  }, [leaves, search]);

  const run = async (fn, id) => {
    setBusyId(id);
    try { await fn(id); } finally { setBusyId(null); }
  };

  return (
    <div className="rounded-2xl border border-[#262626] bg-[#0F111A] overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-[#262626]">
        <div>
          <h2 className="text-xl font-semibold text-white">All Leave Requests</h2>
          <p className="text-gray-400 text-xs">View and manage all leave requests for your team.</p>
        </div>

        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search name, type, reason..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#1b1b1b] border border-[#2d2d2d] rounded-md pl-10 pr-4 py-2 text-white outline-none focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#0F111A]">
            <tr className="text-left">
              {["Employee", "Leave Type", "Duration", "Applied", "Status", ""].map((h) => (
                <th key={h} className="px-6 py-4 text-gray-400 font-medium text-sm whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-14 text-center text-gray-500 text-sm">No leave requests found.</td>
              </tr>
            )}

            {filteredData.map((leave) => (
              <tr key={leave.id} className="border-t border-[#222] hover:bg-[#181818]">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white shrink-0"
                      style={{ background: colorFor(leave.employeeId) }}
                    >
                      {initialsOf(leave.employeeName)}
                    </div>
                    <div>
                      <p className="font-medium text-white whitespace-nowrap">{leave.employeeName}</p>
                      <p className="text-sm text-gray-500 max-w-xs truncate">{leave.reason || "—"}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-gray-300 whitespace-nowrap">{TYPE_LABEL[leave.type] || leave.type}</td>

                <td className="px-6 py-5">
                  <div>
                    <p className="text-white whitespace-nowrap">{leave.fromDate}</p>
                    <p className="text-sm text-gray-500 whitespace-nowrap">{leave.toDate}</p>
                  </div>
                </td>

                <td className="px-6 py-5 text-gray-300 whitespace-nowrap">
                  {leave.appliedAt ? new Date(leave.appliedAt).toLocaleDateString() : "—"}
                </td>

                <td className="px-6 py-5">
                  <StatusBadge status={titleCase(leave.status)} />
                </td>

                <td className="px-6 py-5">
                  {leave.status === "PENDING" ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => run(onApprove, leave.id)}
                        disabled={busyId === leave.id}
                        className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 flex items-center justify-center disabled:opacity-50"
                        title="Approve"
                      >
                        {busyId === leave.id ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                      </button>
                      <button
                        onClick={() => run(onReject, leave.id)}
                        disabled={busyId === leave.id}
                        className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center disabled:opacity-50"
                        title="Reject"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">{leave.decidedByName ? `By ${leave.decidedByName}` : "—"}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTable;

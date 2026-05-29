// src/Pages/AdminLeavePage.jsx
import { useContext } from "react";
import { AuthContext } from "../Components/Context/AuthProvider";
import { Check, X, CalendarDays, Clock } from "lucide-react";

const leaveTypeColors = {
  sick: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  casual: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  vacation: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
};

const AdminLeavePage = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const employees = userData.employeesData || [];

  const allRequests = employees.flatMap((emp) =>
    (emp.leaveRequests || []).map((req) => ({ ...req, employeeName: emp.Name, employeeId: emp.id, department: emp.department }))
  ).sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn));

  const pending = allRequests.filter((r) => r.status === "pending");
  const others = allRequests.filter((r) => r.status !== "pending");

  const updateLeave = (employeeId, leaveId, status) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.id !== employeeId) return emp;
      const updatedRequests = emp.leaveRequests.map((r) =>
        r.id === leaveId ? { ...r, status } : r
      );
      const hasApproved = updatedRequests.some((r) => r.status === "approved");
      const hasPending = updatedRequests.some((r) => r.status === "pending");

      // Notify employee
      const notification = {
        id: Date.now(),
        type: status === "approved" ? "leave_approved" : "leave_rejected",
        message: status === "approved"
          ? "Your leave request has been approved by admin."
          : "Your leave request has been rejected by admin.",
        date: new Date().toISOString(),
        read: false,
      };

      return {
        ...emp,
        leaveRequests: updatedRequests,
        leaveStatus: hasApproved ? "approved" : hasPending ? "pending" : "none",
        isActive: status === "approved" ? false : emp.isActive,
        notifications: [...(emp.notifications || []), notification],
      };
    });

    localStorage.setItem("employeeData", JSON.stringify(updatedEmployees));
    setUserData({ ...userData, employeesData: updatedEmployees });
  };

  const totalDays = (start, end) => Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1;

  const LeaveCard = ({ req, showActions }) => {
    const colors = leaveTypeColors[req.leaveType] || leaveTypeColors.casual;
    return (
      <div className={`p-4 rounded-xl border ${colors.border} ${colors.bg}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-[#f1f5f9]">{req.employeeName}</p>
            <p className="text-xs text-[#64748b]">{req.department}</p>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize font-medium border ${colors.border} ${colors.text}`}>
            {req.leaveType}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#94a3b8] mb-2">
          <CalendarDays size={12} />
          {new Date(req.startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
          {" → "}
          {new Date(req.endDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          <span className="text-[#64748b]">· {totalDays(req.startDate, req.endDate)} days</span>
        </div>

        <p className="text-xs text-[#64748b] mb-3 line-clamp-2">{req.reason}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[10px] text-[#64748b]">
            <Clock size={10} />
            {new Date(req.appliedOn).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </div>
          {showActions ? (
            <div className="flex gap-2">
              <button
                onClick={() => updateLeave(req.employeeId, req.id, "approved")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0f2e2b] text-[#14f195] border border-[#14f195]/30 text-xs hover:bg-[#14f195]/20 transition-all"
              >
                <Check size={11} /> Approve
              </button>
              <button
                onClick={() => updateLeave(req.employeeId, req.id, "rejected")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#33111a] text-red-400 border border-red-500/30 text-xs hover:bg-red-500/10 transition-all"
              >
                <X size={11} /> Reject
              </button>
            </div>
          ) : (
            <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize
              ${req.status === "approved" ? "bg-[#0f2e2b] text-[#14f195]" : ""}
              ${req.status === "rejected" ? "bg-[#33111a] text-red-400" : ""}
              ${req.status === "cancelled" ? "bg-[#1e2333] text-[#64748b]" : ""}
            `}>
              {req.status}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="ml-58 p-6 overflow-y-auto max-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#f1f5f9]">Leave Requests</h1>
        <p className="text-sm text-[#64748b] mt-0.5">Review and manage employee leave requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Requests", value: allRequests.length, color: "text-[#60a5fa]" },
          { label: "Pending", value: pending.length, color: "text-[#93c5fd]" },
          { label: "Approved", value: allRequests.filter((r) => r.status === "approved").length, color: "text-[#14f195]" },
          { label: "Rejected", value: allRequests.filter((r) => r.status === "rejected").length, color: "text-red-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#151822] border border-[#1e2333] rounded-xl p-4">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-[#64748b] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#f1f5f9] mb-3 flex items-center gap-2">
            Pending Approval
            <span className="h-5 w-5 bg-[#3b82f6] rounded-full text-[10px] text-white flex items-center justify-center">{pending.length}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {pending.map((req) => <LeaveCard key={req.id} req={req} showActions={true} />)}
          </div>
        </div>
      )}

      {/* History */}
      {others.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-[#f1f5f9] mb-3">History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {others.map((req) => <LeaveCard key={req.id} req={req} showActions={false} />)}
          </div>
        </div>
      )}

      {allRequests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <CalendarDays size={40} className="text-[#1e2333] mb-3" />
          <p className="text-sm text-[#64748b]">No leave requests yet</p>
          <p className="text-xs text-[#334155] mt-1">Employee leave requests will appear here</p>
        </div>
      )}
    </div>
  );
};

export default AdminLeavePage;
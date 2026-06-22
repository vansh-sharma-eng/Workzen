// Members.jsx
import { useContext } from "react";
import { Eye, SquareCheckBig } from "lucide-react";
import { AuthContext } from "../Context/AuthProvider";

const Members = ({ activeFilter }) => {
  const { userData, setUserData } = useContext(AuthContext);
  const employees = userData.employeesData || [];

  const filteredMembers =
    activeFilter === "All"
      ? employees
      : employees.filter((m) => m.department === activeFilter);

  const progressColor = (p) => {
    if (p >= 80) return "bg-[#3b82f6]";
    if (p >= 50) return "bg-amber-400";
    return "bg-red-500";
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  };

  const getProgress = (taskNumber) => {
    if (!taskNumber || taskNumber.total === 0) return 0;
    return Math.floor((taskNumber.completed / taskNumber.total) * 100);
  };


  const approveLeave = (id) => {
    const updated = employees.map((emp) =>
      emp.id === id
        ? { ...emp, leaveStatus: "approved", isActive: false }
        : emp
    );
    localStorage.setItem("employeeData", JSON.stringify(updated));
    setUserData({ ...userData, employeesData: updated });
  };


  const rejectLeave = (id) => {
    const updated = employees.map((emp) =>
      emp.id === id
        ? { ...emp, leaveStatus: "none", isActive: true }
        : emp
    );
    localStorage.setItem("employeeData", JSON.stringify(updated));
    setUserData({ ...userData, employeesData: updated });
  };

  const statusBadge = (member) => {
    if (member.leaveStatus === "approved") {
      return (
        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border bg-[#3b2a12] text-[#fbbf24] border-[#fbbf24]/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24]" />
          On Leave
        </span>
      );
    }
    if (member.leaveStatus === "pending") {
      return (
        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border bg-[#1e2333] text-[#93c5fd] border-[#3b82f6]/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#93c5fd]" />
          Leave Pending
        </span>
      );
    }
    if (member.isActive) {
      return (
        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border bg-[#0f2e2b] text-[#14f195] border-[#14f195]/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#14f195]" />
          Active
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border bg-[#1e2333] text-[#64748b] border-[#1e2333]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#64748b]" />
        Inactive
      </span>
    );
  };

  return (
    <div className="px-6 py-4">
      {filteredMembers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-[#f1f5f9] -ml-70 text-sm font-medium">No employees found</p>
          <p className="text-[#64748b] -ml-70 text-xs mt-1">
            {activeFilter === "All"
              ? "No employees added yet."
              : `No one in the ${activeFilter} department yet.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredMembers.map((member) => {
            const progress = getProgress(member.taskNumber);
            return (
              <div
                key={member.id}
                className="bg-[#151822] rounded-xl border border-[#1e2333] p-5 text-[#f1f5f9] hover:border-[#3b82f6]/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-[#1e2333] border border-[#3b82f6]/20 flex items-center justify-center text-md font-semibold text-[#60a5fa]">
                    {getInitials(member.Name.toUpperCase().charAt(0))}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#f1f5f9]">{member.Name}</p>
                    <p className="text-xs text-[#64748b]">{member.role || member.department}</p>
                  </div>
                  <div className="ml-auto">
                    {statusBadge(member)}
                  </div>
                </div>

                <span className="inline-block text-[11px] px-3 py-1 rounded-full bg-[#1e2333] text-[#60a5fa] border border-[#3b82f6]/20 mb-4">
                  {member.department}
                </span>

               {member.leaveStatus === "pending" && (
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => approveLeave(member.id)}
                      className="flex-1 h-8 text-xs rounded-lg border border-[#14f195]/30 bg-[#0f2e2b] text-[#14f195] hover:bg-[#14f195]/20 flex items-center justify-center gap-1.5 transition-all"
                    >
                      Approve Leave
                    </button>
                    <button
                      onClick={() => rejectLeave(member.id)}
                      className="flex-1 h-8 text-xs rounded-lg border border-red-500/30 bg-[#0d0f14] text-red-400 hover:bg-red-500/10 flex items-center justify-center gap-1.5 transition-all"
                    >
                      Reject
                    </button>
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-[#64748b] mb-1.5">
                    <span>Task completion</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-[#1e2333] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${progressColor(progress)}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="border-t border-[#1e2333] my-3" />

                <div className="flex justify-between text-center mb-4">
                  <div>
                    <p className="text-base font-semibold text-[#f1f5f9]">
                      {member.taskNumber?.completed || 0}
                    </p>
                    <p className="text-[11px] text-[#64748b] mt-0.5">Tasks done</p>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#f1f5f9]">
                      {member.taskNumber?.inProgress || 0}
                    </p>
                    <p className="text-[11px] text-[#64748b] mt-0.5">In progress</p>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#f1f5f9]">
                      {member.taskNumber?.total || 0}
                    </p>
                    <p className="text-[11px] text-[#64748b] mt-0.5">Total tasks</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 h-8 text-xs rounded-lg border border-[#1e2333] bg-[#0d0f14] text-[#64748b] hover:text-[#93c5fd] hover:border-[#3b82f6]/30 flex items-center justify-center gap-1.5 transition-all">
                    <Eye size={12} /> View
                  </button>
                  <button className="flex-1 h-8 text-xs rounded-lg border border-[#1e2333] bg-[#0d0f14] text-[#64748b] hover:text-[#93c5fd] hover:border-[#3b82f6]/30 flex items-center justify-center gap-1.5 transition-all">
                    <SquareCheckBig size={12} /> Tasks
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Members;
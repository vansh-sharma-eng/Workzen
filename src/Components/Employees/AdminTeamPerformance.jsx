// AdminTeamPerformance.jsx
import React from "react";

const AdminTeamPerformance = ({ data }) => {
  const employees = data?.employeesData || [];

  const getPercentage = (completed, total) => {
    if (total === 0) return 0;
    return Math.floor((completed / total) * 100);
  };

  const getColor = (percentage) => {
    if (percentage >= 80)
      return { avatar: "bg-emerald-500", progress: "bg-emerald-400" };
    if (percentage >= 50)
      return { avatar: "bg-amber-500", progress: "bg-amber-400" };
    return { avatar: "bg-red-500", progress: "bg-red-500" };
  };

  return (
    <div className="bg-[#151822] border border-[#1e2333] rounded-2xl p-6 w-[480px] ml-6 text-[#f1f5f9] shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm font-semibold text-[#f1f5f9] tracking-wide">
          Team Performance
        </h1>
        <p className="text-[#64748b] text-xs">Tasks completed per person</p>
      </div>

      <div className="space-y-5">
        {employees.map((member) => {
          const completed = member.taskNumber.completed;
          const total = member.taskNumber.total;
          const percentage = getPercentage(completed, total);
          const colors = getColor(percentage);

          return (
            <div key={member.id} className="flex items-start gap-4">
              <div
                className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold text-white ${colors.avatar}`}
              >
                {member.Name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-sm font-medium text-[#f1f5f9]">
                    {member.Name}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#64748b]">
                      {completed}/{total}
                    </span>
                    <span className="text-xs text-[#64748b] w-8 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-[#1e2333] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${colors.progress}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {employees.length === 0 && (
          <p className="text-[#64748b] text-sm text-center py-6">
            No employees found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminTeamPerformance;
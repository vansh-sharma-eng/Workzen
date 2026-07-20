import React from "react";
import { AlertTriangle } from "lucide-react";

const isOverdue = (data) =>
  data.date && !data.completed && data.date < new Date().toISOString().slice(0, 10);

const EmployeeAllTask = ({
  data,
  completeTask,
  failedTask,
  reopenTask,
  acceptTask,
}) => {
  const overdue = isOverdue(data);

  return (
    <div className={`w-full rounded-2xl p-4 text-[#f1f5f9] bg-[#151822] border shadow-lg transition-all duration-300 ${
      overdue ? "border-red-500/50 hover:border-red-500" : "border-[#1e2333] hover:border-[#3b82f6]/30"
    }`}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold leading-5 text-[#f1f5f9]">
            {data.title}
          </h1>
          {overdue && (
            <span className="flex items-center gap-1 text-[9px] font-semibold text-red-400 bg-red-500/10 border border-red-500/30 px-1.5 py-0.5 rounded-full shrink-0">
              <AlertTriangle size={9} /> Overdue
            </span>
          )}
        </div>

        <span className={`text-[10px] whitespace-nowrap px-2 py-1 rounded-lg shrink-0 ${
          overdue ? "bg-red-500/10 text-red-400" : "bg-[#1e2333] text-[#93c5fd]"
        }`}>
          {data.date}
        </span>
      </div>

      <p className="mt-4 text-sm text-[#64748b] leading-6">
        {data.description}
      </p>

      <div className="mt-2 flex items-center gap-2 flex-wrap text-sm text-[#64748b]">
        Category :-
        <span className="py-1 text-[14px] text-[#93c5fd]">
          {data.category}
        </span>
      </div>

      <div className="mt-5 flex gap-2">
        {data.newTask && (
          <button
            onClick={() => acceptTask(data.id)}
            className="flex-1 h-9 text-sm rounded-xl bg-[#032d27] text-[#00f5b4] border border-[#006c57] hover:scale-105 transition-all"
          >
            Accept
          </button>
        )}

        {data.active && (
          <>
            <button
              onClick={() => completeTask(data.id)}
              className="flex-1 h-9 text-sm rounded-xl bg-[#032d27] text-[#00f5b4] border border-[#006c57] hover:scale-105 transition-all"
            >
              Complete
            </button>

            <button
              onClick={() => failedTask(data.id)}
              className="flex-1 h-9 text-sm rounded-xl bg-[#33111a] text-[#ff6b6b] border border-[#6f2b3a] hover:scale-105 transition-all"
            >
              Failed
            </button>
          </>
        )}

        {data.completed && (
          <button
            onClick={() => reopenTask(data.id)}
            className="w-full h-9 text-sm rounded-xl bg-[#032d27] text-[#00f5b4] border border-[#006c57]"
          >
            Completed
          </button>
        )}

        {data.failed && (
          <button
            onClick={() => reopenTask(data.id)}
            className="w-full h-9 text-sm rounded-xl bg-[#0d1a3a] text-[#60a5fa] border border-[#1e3a6e] hover:scale-105 transition-all"
          >
            Reopen Task
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeAllTask;
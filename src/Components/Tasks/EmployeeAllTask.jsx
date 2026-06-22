import React from "react";

const EmployeeAllTask = ({
  data,
  index,
  completeTask,
  failedTask,
  reopenTask,
  acceptTask,
}) => {
  return (
    <div className="w-full rounded-2xl p-4 text-[#f1f5f9] bg-[#151822] border border-[#1e2333] shadow-lg transition-all duration-300 hover:border-[#3b82f6]/30">
      <div className="flex justify-between items-start gap-4">
        <h1 className="text-sm font-bold leading-5 text-[#f1f5f9]">
          {data.title}
        </h1>

        <span className="text-[10px] whitespace-nowrap bg-[#1e2333] px-2 py-1 rounded-lg text-[#93c5fd]">
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
            onClick={() => acceptTask(index)}
            className="flex-1 h-9 text-sm rounded-xl bg-[#032d27] text-[#00f5b4] border border-[#006c57] hover:scale-105 transition-all"
          >
            Accept
          </button>
        )}

        {data.active && (
          <>
            <button
              onClick={() => completeTask(index)}
              className="flex-1 h-9 text-sm rounded-xl bg-[#032d27] text-[#00f5b4] border border-[#006c57] hover:scale-105 transition-all"
            >
              Complete
            </button>

            <button
              onClick={() => failedTask(index)}
              className="flex-1 h-9 text-sm rounded-xl bg-[#33111a] text-[#ff6b6b] border border-[#6f2b3a] hover:scale-105 transition-all"
            >
              Failed
            </button>
          </>
        )}

        {data.completed && (
          <button
            onClick={() => reopenTask(index)}
            className="w-full h-9 text-sm rounded-xl bg-[#032d27] text-[#00f5b4] border border-[#006c57]"
          >
            Completed
          </button>
        )}

        {data.failed && (
          <button
            onClick={() => reopenTask(index)}
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
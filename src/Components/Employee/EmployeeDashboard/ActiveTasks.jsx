import React from "react";

const COLORS = ["bg-orange-500", "bg-indigo-500", "bg-green-500", "bg-pink-500", "bg-cyan-500"];

const ActiveTasks = ({ tasks = [], loading = false }) => {
  const active = tasks
    .filter((t) => t.active || t.newTask)
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""))
    .slice(0, 5);

  return (
    <div className=" bg-[#10111C] border border-[#1E2235] rounded-md p-6 h-full h-auto w-140 ">
      <div className="flex items-center justify-between mb-6  ">
        <h2 className="text-white text-2xl font-bold">
          My Active Tasks
        </h2>
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading…</p>
      ) : active.length === 0 ? (
        <p className="text-slate-500 text-sm">No active tasks right now.</p>
      ) : (
        <div className="space-y-4">
          {active.map((task, index) => (
            <div
              key={task.id}
              className="border border-gray-800 rounded-md p-3 bg-[#1b1c28] border border-[#1E2235] hover:border-gray-700 transition"
            >
              <div className="flex items-center gap-4">
                <div className={`w-1.5 h-1.5 rounded-full ${COLORS[index % COLORS.length]}`} />

                <div>
                  <h3 className="text-white text-sm font-semibold mb-2">
                    {task.title}
                  </h3>

                  <div className="flex items-center gap-3">
                    <span className="bg-gray-100 text-indigo-600 text-xs font-medium px-2 py-0.5 rounded-lg">
                      {task.category}
                    </span>

                    {task.date && (
                      <span className="text-gray-500 text-xs">
                        Due : {task.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveTasks;

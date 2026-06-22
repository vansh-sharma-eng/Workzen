import React from "react";

const ActiveTasks = () => {
  const tasks = [
    {
      title: "Complete API Integration",
      category: "Engineering",
      due: "2026-06-15",
      color: "bg-orange-500",
    },
    {
      title: "Code Review for Authentication Module",
      category: "Engineering",
      due: "2026-06-12",
      color: "bg-indigo-500",
    },
    {
      title: "Update Documentation",
      category: "Engineering",
      due: "2026-06-08",
      color: "bg-green-500",
    },
    {
      title: "Design System Updates",
      category: "Design",
      due: "2026-06-18",
      color: "bg-orange-500",
    },
    {
      title: "Performance Optimization",
      category: "Engineering",
      due: "2026-06-14",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className=" bg-[#10111C] border border-[#1E2235] rounded-md p-6 h-full h-auto w-140 ">
      <div className="flex items-center justify-between mb-6  ">
        <h2 className="text-white text-2xl font-bold">
          My Active Tasks
        </h2>

        <button className="text-indigo-400 hover:text-indigo-300 font-medium">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="border border-gray-800 rounded-md p-3 bg-[#1b1c28] border border-[#1E2235] hover:border-gray-700 transition"
          >
            <div className="flex items-center gap-4">
              <div className={`w-1.5 h-1.5 rounded-full ${task.color}`} />

              <div>
                <h3 className="text-white text-sm font-semibold mb-2">
                  {task.title}
                </h3>

                <div className="flex items-center gap-3">
                  <span className="bg-gray-100 text-indigo-600 text-xs font-medium px-2 py-0.5 rounded-lg">
                    {task.category}
                  </span>

                  <span className="text-gray-500 text-xs">
                    Due : {task.due}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveTasks;
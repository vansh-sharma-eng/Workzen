import React from "react";
import { Plus } from "lucide-react";
import BoardTaskCard from "./BoardTaskCard";

const TaskColumn = ({ title, color, tasks }) => {
  return (
    <div className="bg-[#14151c] border border-[#272727] rounded-xl p-5 h-fit">
          <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`} />

          <h3 className="text-white text-sm font-semibold">
            {title}
          </h3>

          <span className="bg-[#1d2028] text-gray-300 font-bold text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>

        <button className="w-7 h-7 rounded-lg bg-[#1d2028] border border-[#272727] flex items-center justify-center hover:border-gray-500 transition">
          <Plus size={15} className="text-gray-400" />
        </button>
      </div>

      
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <BoardTaskCard
              key={task.id}
              task={task}
            />
          ))
        ) : (
          <div className="border-2 border-dashed border-[#272727] rounded-2xl py-8 text-center">
            <p className="text-gray-500 text-xs">
              No tasks
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
import React from "react";
import {
  Calendar,
  Trash2,
  Circle,
} from "lucide-react";

import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import Avatar from "./Avatar";

const TaskCard = ({ task }) => {
  return (
    <div className="bg-[#14151c] border border-[#272727] rounded-3xl p-7 hover:border-gray-500 transition-all duration-300">
      <div className="flex justify-between gap-6">
        <div className="flex flex-1 gap-4">
          <div className="mt-3">
            <Circle
              size={18}
              className={`${
                task.completed
                  ? "text-emerald-500 fill-emerald-500"
                  : "text-gray-400"
              }`}
            />
          </div>

          <div className="flex-1">
            <h2
              className={`text-md mt-1 font-semibold ${
                task.completed
                  ? "text-gray-500 line-through"
                  : "text-white"
              }`}
            >
              {task.title}
            </h2>

            
            <p className="text-gray-400 mt-0.5 leading-5 text-md">
              {task.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <PriorityBadge priority={task.priority} />

              <span className="px-3 py-1 rounded-md bg-[#22252d] text-gray-300 text-xs">
                {task.category}
              </span>

              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Calendar size={14} />
                {task.dueDate}
              </div>
            </div>
          </div>
        </div>

   
        <div className="flex flex-col items-end justify-between">
          <div className="flex items-center gap-4 ">
            <Avatar
              initials={task.assignee}
              color={task.assigneeColor}
            />

            <button className="text-gray-500 hover:text-red-500 transition">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      
      <div className="mt-4 pt-2 border-t border-[#272727] flex items-center justify-between">
        <StatusBadge status={task.status} />

        <span className="text-gray-500 text-xs">
          {task.createdAt}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
import React from "react";
import { Calendar } from "lucide-react";

import PriorityBadge from "./PriorityBadge";
import Avatar from "./Avatar";

const BoardTaskCard = ({ task }) => {
  return (
    <div className="bg-[#14151c] border border-[#272727] rounded-xl p-4 hover:border-gray-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
  
      <div className="flex items-center justify-between mb-2">
        <PriorityBadge priority={task.priority} />

        <Avatar
          initials={task.assignee}
          color={task.assigneeColor}
          small
        />
      </div>

 
      <h3 className="text-white font-semibold text-xs leading-4 line-clamp-2">
        {task.title}
      </h3>

 
      <p className="text-gray-400 text-xs mt-2 line-clamp-3">
        {task.description}
      </p>

            <div className="mt-2">
        <span className="inline-flex px-2 py-1 rounded-full bg-[#1d2028] text-gray-300 text-xs">
          {task.category}
        </span>
      </div>

      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#272727]">
        <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
          <Calendar size={13} />
          <span>{task.dueDate}</span>
        </div>

        <span className="text-[10px] text-gray-500">
          {task.createdAt}
        </span>
      </div>
    </div>
  );
};

export default BoardTaskCard;
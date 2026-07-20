import React from "react";
import { Calendar, AlertTriangle } from "lucide-react";

import PriorityBadge from "./PriorityBadge";
import Avatar from "./Avatar";

const STATUS_OPTIONS = ["To Do", "In Progress", "Completed", "Failed"];

const isOverdue = (task) =>
  task.dueDate && task.status !== "Completed" && task.dueDate < new Date().toISOString().slice(0, 10);

const BoardTaskCard = ({ task, onStatusChange }) => {
  const overdue = isOverdue(task);

  return (
    <div className={`bg-[#14151c] border rounded-xl p-4 transition-all duration-300 ${
      overdue ? "border-red-500/50 hover:border-red-500" : "border-[#272727] hover:border-gray-500"
    }`}>
  
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

      <div className="mt-3">
        <select
          value={task.status}
          onChange={(e) => onStatusChange?.(task.id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-[#1b1d24] border border-[#272727] rounded-lg px-2 py-1.5 text-[11px] text-white outline-none focus:border-blue-500"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#272727]">
        <div className={`flex items-center gap-1.5 text-[11px] ${overdue ? "text-red-400 font-medium" : "text-gray-400"}`}>
          {overdue ? <AlertTriangle size={13} /> : <Calendar size={13} />}
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
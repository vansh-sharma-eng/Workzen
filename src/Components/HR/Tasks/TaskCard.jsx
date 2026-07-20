import React from "react";
import {
  Calendar,
  Trash2,
  AlertTriangle,
} from "lucide-react";

import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import Avatar from "./Avatar";

const STATUS_OPTIONS = ["To Do", "In Progress", "Completed", "Failed"];

const isOverdue = (task) =>
  task.dueDate && task.status !== "Completed" && task.dueDate < new Date().toISOString().slice(0, 10);

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const overdue = isOverdue(task);

  return (
    <div className={`bg-[#14151c] border rounded-3xl p-7 transition-all duration-300 ${
      overdue ? "border-red-500/50 hover:border-red-500" : "border-[#272727] hover:border-gray-500"
    }`}>
      <div className="flex justify-between gap-6">
        <div className="flex flex-1 gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-md mt-1 font-semibold text-white">
                {task.title}
              </h2>
              {overdue && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-full">
                  <AlertTriangle size={10} /> Overdue
                </span>
              )}
            </div>

            <p className="text-gray-400 mt-0.5 leading-5 text-md">
              {task.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <PriorityBadge priority={task.priority} />

              <span className="px-3 py-1 rounded-md bg-[#22252d] text-gray-300 text-xs">
                {task.category}
              </span>

              <div className={`flex items-center gap-2 text-xs ${overdue ? "text-red-400 font-medium" : "text-gray-400"}`}>
                <Calendar size={14} />
                {task.dueDate}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between gap-3">
          <div className="flex items-center gap-4 ">
            <Avatar
              initials={task.assignee}
              color={task.assigneeColor}
            />

            <button
              onClick={() => onDelete?.(task.id)}
              className="text-gray-500 hover:text-red-500 transition"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#272727] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <StatusBadge status={task.status} />

          <select
            value={task.status}
            onChange={(e) => onStatusChange?.(task.id, e.target.value)}
            className="bg-[#1b1d24] border border-[#272727] rounded-md px-2 py-1 text-xs text-white outline-none focus:border-blue-500"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <span className="text-gray-500 text-xs">
          {task.createdAt}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;

import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {
  if (!tasks.length) {
    return (
      <div className="bg-[#14151c] border border-[#272727] rounded-3xl p-16 text-center">
        <h2 className="text-xl font-semibold text-white">
          No Tasks Found
        </h2>

        <p className="text-gray-500 mt-1">
          There are no tasks matching the selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
};

export default TaskList;
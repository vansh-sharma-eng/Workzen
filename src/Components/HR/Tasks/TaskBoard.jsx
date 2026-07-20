import React from "react";
import TaskColumn from "./TaskColumn";

const TaskBoard = ({ tasks, onCreateFor, onStatusChange }) => {
  const todo = tasks.filter((task) => task.status === "To Do");

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  );

  const failed = tasks.filter(
    (task) => task.status === "Failed"
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
      <TaskColumn
        title="To Do"
        color="bg-slate-500"
        tasks={todo}
        onAdd={onCreateFor}
        onStatusChange={onStatusChange}
      />

      <TaskColumn
        title="In Progress"
        color="bg-blue-500"
        tasks={inProgress}
        onAdd={onCreateFor}
        onStatusChange={onStatusChange}
      />

      <TaskColumn
        title="Completed"
        color="bg-emerald-500"
        tasks={completed}
        onAdd={onCreateFor}
        onStatusChange={onStatusChange}
      />

      <TaskColumn
        title="Failed"
        color="bg-red-500"
        tasks={failed}
        onAdd={onCreateFor}
        onStatusChange={onStatusChange}
      />
    </div>
  );
};

export default TaskBoard;
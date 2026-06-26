import React from "react";
import TaskColumn from "./TaskColumn";

const TaskBoard = ({ tasks }) => {
  const todo = tasks.filter((task) => task.status === "To Do");

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const inReview = tasks.filter(
    (task) => task.status === "In Review"
  );

  const done = tasks.filter(
    (task) => task.status === "Done"
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
      <TaskColumn
        title="To Do"
        color="bg-slate-500"
        tasks={todo}
      />

      <TaskColumn
        title="In Progress"
        color="bg-blue-500"
        tasks={inProgress}
      />

      <TaskColumn
        title="In Review"
        color="bg-amber-500"
        tasks={inReview}
      />

      <TaskColumn
        title="Done"
        color="bg-emerald-500"
        tasks={done}
      />
    </div>
  );
};

export default TaskBoard;
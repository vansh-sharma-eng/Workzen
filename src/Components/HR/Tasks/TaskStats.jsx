import React from "react";
import {
  ListTodo,
  LoaderCircle,
  AlertTriangle,
  CircleCheckBig,
} from "lucide-react";

import TaskStatCard from "./TaskStatCard";

const TaskStats = ({ tasks }) => {
  const total = tasks.length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const overdue = tasks.filter((task) => {
    if (task.completed) return false;

    const dueDate = new Date(task.dueDate);
    const today = new Date();

    return dueDate < today;
  }).length;

  const completed = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <TaskStatCard
        title="Total Tasks"
        value={total}
        subtitle="All assigned"
        icon={ListTodo}
        iconColor="text-indigo-500"
        bgColor="bg-indigo-500/10"
      />

      <TaskStatCard
        title="In Progress"
        value={inProgress}
        subtitle="Active now"
        icon={LoaderCircle}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
      />

      <TaskStatCard
        title="Overdue"
        value={overdue}
        subtitle="Past due date"
        icon={AlertTriangle}
        iconColor="text-red-500"
        bgColor="bg-red-500/10"
      />

      <TaskStatCard
        title="Completed"
        value={completed}
        subtitle="Closed tasks"
        icon={CircleCheckBig}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
    </div>
  );
};

export default TaskStats;
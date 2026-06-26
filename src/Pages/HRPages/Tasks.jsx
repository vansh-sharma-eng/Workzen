import React, { useMemo, useState } from "react";

import TaskHeader from "../../Components/HR/Tasks/TaskHeader";
import TaskFilters from "../../Components/HR/Tasks/TaskFilters";
import TaskStats from "../../Components/HR/Tasks/TaskStats";
import TaskList from "../../Components/HR/Tasks/TaskList";
import TaskBoard from "../../Components/HR/Tasks/TaskBoard";

import { tasks } from "../../data/HrData/taskData";

const Tasks = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [view, setView] = useState("list");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch =
        statusFilter === "All" || task.status === statusFilter;

      const priorityMatch =
        priorityFilter === "All Priorities" ||
        task.priority === priorityFilter;

      const categoryMatch =
        categoryFilter === "All" ||
        task.category === categoryFilter;

      return statusMatch && priorityMatch && categoryMatch;
    });
  }, [statusFilter, priorityFilter, categoryFilter]);

  return (
    <div className="h-auto text-white p-2 space-y-6">
     
      <TaskHeader view={view} setView={setView} />

      <TaskFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {/* Stats */}
      <TaskStats tasks={filteredTasks} />

      {/* View */}
      {view === "list" ? (
        <TaskList tasks={filteredTasks} />
      ) : (
        <TaskBoard tasks={filteredTasks} />
      )}
    </div>
  );
};

export default Tasks;
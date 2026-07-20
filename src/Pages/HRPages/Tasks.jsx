import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

import TaskHeader from "../../Components/HR/Tasks/TaskHeader";
import TaskFilters from "../../Components/HR/Tasks/TaskFilters";
import TaskStats from "../../Components/HR/Tasks/TaskStats";
import TaskList from "../../Components/HR/Tasks/TaskList";
import TaskBoard from "../../Components/HR/Tasks/TaskBoard";
import CreateTaskModal from "../../Components/HR/Tasks/CreateTaskModal";

import taskApi from "../../api/taskApi";

const STATUS_LABEL = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  FAILED: "Failed",
};
const STATUS_VALUE = Object.fromEntries(
  Object.entries(STATUS_LABEL).map(([k, v]) => [v, k])
);

const PRIORITY_LABEL = { LOW: "Low", MEDIUM: "Medium", HIGH: "High" };

const AVATAR_COLORS = [
  "bg-blue-500", "bg-violet-500", "bg-emerald-500",
  "bg-orange-500", "bg-pink-500", "bg-cyan-500",
];

const initialsFor = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || name[0].toUpperCase();
};

const colorFor = (name) => {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

/** Maps a backend TaskDto to the shape the HR task UI components expect. */
const adaptTask = (dto) => {
  const catMatch = /^\[(.+?)\]\s*(.*)$/s.exec(dto.description || "");
  const category = catMatch ? catMatch[1] : "General";
  const description = catMatch ? catMatch[2] : dto.description || "";

  return {
    id: dto.id,
    title: dto.title,
    description,
    category,
    priority: PRIORITY_LABEL[dto.priority] || dto.priority,
    status: STATUS_LABEL[dto.status] || dto.status,
    assignee: initialsFor(dto.assignedToName),
    assigneeName: dto.assignedToName,
    assigneeColor: colorFor(dto.assignedToName),
    dueDate: dto.dueDate || "",
    createdAt: dto.createdAt ? new Date(dto.createdAt).toLocaleDateString() : "",
  };
};

const Tasks = ({ data }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [view, setView] = useState("list");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const result = await taskApi.getAll(data?.id ? { managerId: data.id } : undefined);
      setTasks((result || []).map(adaptTask));
    } catch (err) {
      setLoadError(err.message || "Couldn't load tasks.");
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    load();
  }, [load]);

  const handleStatusChange = async (taskId, newStatusLabel) => {
    // Optimistic update so the UI feels instant.
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatusLabel } : t)));
    try {
      await taskApi.update(taskId, { status: STATUS_VALUE[newStatusLabel] });
    } catch (err) {
      setLoadError(err.message || "Couldn't update task status.");
      load();
    }
  };

  const handleDelete = async (taskId) => {
    const prev = tasks;
    setTasks((cur) => cur.filter((t) => t.id !== taskId));
    try {
      await taskApi.remove(taskId);
    } catch (err) {
      setLoadError(err.message || "Couldn't delete this task.");
      setTasks(prev);
    }
  };

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

      const searchMatch =
        !searchTerm.trim() ||
        task.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        (task.assigneeName || "").toLowerCase().includes(searchTerm.trim().toLowerCase());

      return statusMatch && priorityMatch && categoryMatch && searchMatch;
    });
  }, [tasks, statusFilter, priorityFilter, categoryFilter, searchTerm]);

  return (
    <div className="h-auto text-white p-2 space-y-6">

      <TaskHeader
        view={view}
        setView={setView}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onCreateTask={() => setShowCreateModal(true)}
      />

      <TaskFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {loadError && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={14} className="shrink-0" /> {loadError}
        </div>
      )}

      {/* Stats */}
      <TaskStats tasks={filteredTasks} />

      {loading ? (
        <div className="flex flex-col items-center justify-center h-56 text-gray-500 gap-2">
          <Loader2 size={22} className="animate-spin" />
          Loading tasks…
        </div>
      ) : view === "list" ? (
        <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} onDelete={handleDelete} />
      ) : (
        <TaskBoard
          tasks={filteredTasks}
          onCreateFor={() => setShowCreateModal(true)}
          onStatusChange={handleStatusChange}
        />
      )}

      <CreateTaskModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={load}
      />
    </div>
  );
};

export default Tasks;

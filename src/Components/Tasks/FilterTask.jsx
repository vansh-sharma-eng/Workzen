<<<<<<< HEAD
const FilterTask = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { label: "All", value: "all" },
    { label: "New", value: "newTask" },
    { label: "In Progress", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Failed", value: "failed" },
  ];

  return (
    <div className="flex flex-wrap gap-3 px-3 mt-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setActiveFilter(filter.value)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
            ${
              activeFilter === filter.value
                ? "bg-indigo-500 text-white"
                : "bg-[#090d1f] border border-gray-800 text-gray-300"
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
=======
// FilterTask.jsx
import React from "react";

const FilterTask = ({ data, activeFilter, setActiveFilter }) => {
  return (
    <>
      <div className="flex ml-44 p-1 mt-2 gap-1.5">
        <h1
          onClick={() => setActiveFilter("all")}
          className={`py-1 px-3 rounded-2xl cursor-pointer transition-all duration-200 text-[#f1f5f9] ${
            activeFilter === "all"
              ? "bg-[#1e2333] ring-1 ring-[#3b82f6]/40"
            : "bg-[#151822] hover:bg-[#1e2333]"
          }`}
        >
          All Tasks
          <span className="py-0.5 px-2 text-xs font-medium ml-3 rounded-full bg-[#1e2333] text-[#60a5fa]">
            {data.total || 0}
          </span>
        </h1>

        <h1
          onClick={() => setActiveFilter("active")}
          className={`py-1 px-3 rounded-2xl cursor-pointer transition-all duration-200 text-[#f1f5f9] ${
            activeFilter === "active"
              ? "bg-[#1e2333] ring-1 ring-[#3b82f6]/40"
              : "bg-[#151822] hover:bg-[#1e2333]"
          }`}
        >
          In Progress
          <span className="py-0.5 px-2 text-xs font-medium ml-3 rounded-full bg-[#1e2333] text-[#60a5fa]">
            {data.inProgress || 0}
          </span>
        </h1>

        <h1
          onClick={() => setActiveFilter("completed")}
          className={`py-1 px-3 rounded-2xl cursor-pointer transition-all duration-200 text-[#f1f5f9] ${
            activeFilter === "completed"
              ? "bg-[#1e2333] ring-1 ring-[#3b82f6]/40"
              : "bg-[#151822] hover:bg-[#1e2333]"
          }`}
        >
          Completed
          <span className="py-0.5 px-2 text-xs font-medium ml-3 rounded-full bg-[#1e2333] text-[#60a5fa]">
            {data.completed || 0}
          </span>
        </h1>

        <h1
          onClick={() => setActiveFilter("failed")}
          className={`py-1 px-3 rounded-2xl cursor-pointer transition-all duration-200 text-[#f1f5f9] ${
            activeFilter === "failed"
              ? "bg-[#1e2333] ring-1 ring-[#3b82f6]/40"
              : "bg-[#151822] hover:bg-[#1e2333]"
          }`}
        >
          Failed
          <span className="py-0.5 px-2 text-xs font-medium ml-3 rounded-full bg-[#1e2333] text-[#60a5fa]">
            {data.failed || 0}
          </span>
        </h1>

        <h1
          onClick={() => setActiveFilter("newTask")}
          className={`py-1 px-3 rounded-2xl cursor-pointer transition-all duration-200 text-[#f1f5f9] ${
            activeFilter === "newTask"
              ? "bg-[#1e2333] ring-1 ring-[#3b82f6]/40"
              : "bg-[#151822] hover:bg-[#1e2333]"
          }`}
        >
          New Tasks
          <span className="py-0.5 px-2 text-xs font-medium ml-3 rounded-full bg-[#1e2333] text-[#60a5fa]">
            {data.newTask || 0}
          </span>
        </h1>
      </div>
    </>
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
  );
};

export default FilterTask;
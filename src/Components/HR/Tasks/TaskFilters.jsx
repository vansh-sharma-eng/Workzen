import React from "react";
import { Search, Filter } from "lucide-react";

const priorities = ["All Priorities", "Low", "Medium", "High"];
const categories = ["All", "Performance", "Policy", "Onboarding", "Culture", "Reporting"];

const TaskFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
}) => {
  return (
    <div className="bg-[#14151c] border border-[#272727] rounded-2xl p-5">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    
        <div className="relative">
          <Search
            size={15}
            className="absolute left-4 top-4.5 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-11 pr-4 py-1 rounded-md bg-[#1b1d24] border border-[#272727] text-white placeholder-gray-500 outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1b1d24] border border-[#272727] rounded-md px-4 py-1 text-white outline-none focus:border-blue-500"
        >
          <option>All</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Failed</option>
        </select>

       
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="bg-[#1b1d24] border border-[#272727] rounded-md px-4 py-1 text-white outline-none focus:border-blue-500"
        >
          {priorities.map((priority) => (
            <option key={priority}>{priority}</option>
          ))}
        </select>

        
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-[#1b1d24] border border-[#272727] rounded-md px-4 py-1 text-white outline-none focus:border-blue-500"
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>


      <div className="flex flex-wrap items-center gap-3 mt-5">
        <div className="flex items-center gap-2 text-gray-400">
          <Filter size={14} />
          <span className="text-sm">Filters:</span>
        </div>

        <span className="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs">
          Status: {statusFilter}
        </span>

        <span className="px-3 py-1 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 text-xs">
          Priority: {priorityFilter}
        </span>

        <span className="px-3 py-1 rounded-xl bg-green-500/10 text-green-400 border border-green-500/30 text-xs">
          Category: {categoryFilter}
        </span>
      </div>
    </div>
  );
};

export default TaskFilters;
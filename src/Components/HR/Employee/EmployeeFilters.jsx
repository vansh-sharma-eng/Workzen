import React from "react";
import { Search, UserPlus, ChevronDown } from "lucide-react";

const DEPARTMENTS = ["Engineering", "Design", "Sales", "Marketing", "Finance", "Operations", "HR", "Product", "Analytics", "Customer Support"];

const EmployeeFilters = ({
  search, setSearch,
  deptFilter, setDeptFilter,
  statusFilter, setStatusFilter,
  sortBy, setSortBy,
  onAddEmployee,
}) => {
  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-md p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees by name, role, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0F111A] border border-[#1A2035] rounded-md py-1.5 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="relative">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="appearance-none bg-[#0F111A] border border-[#1A2035] rounded-md px-4 py-1.5 pr-10 text-white focus:outline-none focus:border-indigo-500 min-w-[170px] text-sm"
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-[#0F111A] border border-[#1A2035] rounded-md px-4 py-1.5 pr-10 text-white focus:outline-none focus:border-indigo-500 min-w-[150px] text-sm"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
          <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-[#0F111A] border border-[#1A2035] rounded-md px-4 py-1.5 pr-10 text-white focus:outline-none focus:border-indigo-500 min-w-[170px] text-sm"
          >
            <option value="name">Sort : Name</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <button
          onClick={onAddEmployee}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all rounded-md px-6 py-1.5 font-medium text-sm"
        >
          <UserPlus size={15} />
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default EmployeeFilters;

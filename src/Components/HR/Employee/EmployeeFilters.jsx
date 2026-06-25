import React, { useState } from "react";
import {
  Search,
  UserPlus,
  ChevronDown,
} from "lucide-react";

const EmployeeFilters = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-md p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-center">

        
        <div className="relative flex-1 min-w-[220px]">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search employees by name, role, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              bg-[#0F111A]
              border
              border-[#1A2035]
              rounded-md
              py-1.5
              pl-12
              pr-4
              text-white
              placeholder:text-gray-500
              focus:outline-none
              focus:border-indigo-500
            "
          />
        </div>

        {/* Department */}
        <div className="relative">
          <select
            className="
              appearance-none
              bg-[#0F111A]
              border
              border-[#1A2035]
              rounded-md
              px-4
              py-1.5
              pr-10
              text-white
              focus:outline-none
              focus:border-indigo-500
              min-w-[170px]
              text-sm
            "
          >
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>Sales</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Marketing</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* Status */}
        <div className="relative">
          <select
            className="
              appearance-none
              bg-[#0F111A]
              border
              border-[#1A2035]
              rounded-md
              px-4
              py-1.5
              pr-10
              text-white
              focus:outline-none
              focus:border-indigo-500
              min-w-[150px]
              text-sm
            "
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>On Leave</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            className="
              appearance-none
              bg-[#0F111A]
              border
              border-[#1A2035]
              rounded-md
              px-4
              py-1.5
              pr-10
              text-white
              focus:outline-none
              focus:border-indigo-500
              min-w-[170px]
              text-sm
            "
          >
            <option>Sort : Name</option>
            <option>Newest</option>
            <option>Oldest</option>
            <option>Tasks</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* Add Employee */}
        <button
          className="
            flex
            items-center
            gap-2
            bg-indigo-600
            hover:bg-indigo-700
            transition-all
            rounded-md
            px-6
            py-1.5
            font-medium
            text-sm
          "
        >
          <UserPlus size={15} />
          Add Employee
        </button>

      </div>
    </div>
  );
};

export default EmployeeFilters;
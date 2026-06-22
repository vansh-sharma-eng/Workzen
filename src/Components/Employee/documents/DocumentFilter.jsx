import React from "react";
import { Search, ChevronDown } from "lucide-react";

const DocumentFilter = ({
  search,
  setSearch,
  category,
  setCategory,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 mb-5">
      <div className="flex-1 relative">
        <Search
          size={18}
          className="absolute left-6 top-5.5 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-[#10111C] border border-[#1E2235] rounded-md py-2 pl-14 pr-5 text-white outline-none"
        />
      </div>

      <div className="relative">
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="appearance-none bg-[#10111C] border border-[#1E2235] rounded-md py-2 pl-5 pr-14 text-white outline-none min-w-[280px]"
        >
          <option>All Documents</option>
          <option>Offer Letter</option>
          <option>Salary Slip</option>
          <option>Appraisal</option>
          <option>ID Proof</option>
        </select>

        <ChevronDown
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default DocumentFilter;
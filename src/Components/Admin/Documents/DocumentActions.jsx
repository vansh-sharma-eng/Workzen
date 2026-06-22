// src/Components/Documents/DocumentActions.jsx

import React from "react";
import {
  Search,
  Upload,
  FilePlus2,
} from "lucide-react";

const DocumentActions = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4 my-3">
      <div className="relative w-[200px] max-w-xs mt-7">
        <Search
          size={13}
          className="absolute left-4 top-3.5 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search documents..."
          className="w-full bg-[#0B1023] border border-[#1A2138] rounded-md text-sm py-2 pl-10 pr-4 text-white outline-none"
        />
      </div>

      <div className="flex gap-2 mt-7">
        <button className="bg-[#0B1023] border border-[#1A2138] h-8 px-4 py-1 rounded-md text-xs text-white flex items-center gap-2">
          <Upload size={14} />
          Upload
        </button>

        <button className="bg-indigo-500 hover:bg-indigo-600 h-8 px-4 py-1 rounded-md text-xs text-white flex items-center gap-2">
          <FilePlus2 size={14} />
          Generate Doc
        </button>
      </div>
    </div>
  );
};

export default DocumentActions;
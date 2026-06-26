import React from "react";
import { Search, FileText, ChevronDown } from "lucide-react";

const DocumentsHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row w-[100%
    ]  gap-4 mb-5">
      <div className="flex-1 relative">
        <Search
          size={17}
          className="absolute left-6 top-5.5 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search by employee or document type..."
          className="w-full h-10 rounded-xl bg-[#14151c] border border-[#272727] pl-14 pr-4 text-sm text-white placeholder:text-gray-500 outline-none focus:border-indigo-500"
        />
      </div>

      <button className="h-10 px-4 rounded-xl bg-white text-black font-medium flex items-center gap-3">
        <FileText size={18} />
        Generate Document
        <ChevronDown size={18} />
      </button>
    </div>
  );
};

export default DocumentsHeader;
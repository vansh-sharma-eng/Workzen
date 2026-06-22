// src/Components/Documents/RecentDocuments.jsx

import React from "react";
import { FileText } from "lucide-react";

const RecentDocuments = ({ documents }) => {
  const colors = {
    indigo:
      "bg-indigo-950 text-indigo-400",
    emerald:
      "bg-emerald-950 text-emerald-400",
    amber:
      "bg-amber-950 text-amber-400",
    cyan:
      "bg-cyan-950 text-cyan-400",
    pink:
      "bg-pink-950 text-pink-400",
  };

  return (
    <div className="border border-[#1E2235] bg-[#10111C] overflow-scroll rounded-md overflow-hidden">
      <div className="p-3  border-b border-[#1A2138]">
        <h2 className="text-md ml-5 font-bold text-white">
          Recent Documents
        </h2>
      </div>

      {documents.map((doc, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row lg:items-center justify-between p-6 border-b border-[#1A2138]"
        >
          <div className="flex items-center gap-4 h-5">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${colors[doc.color]}`}
            >
              <FileText size={16} />
            </div>

            <div>
              <h3 className="text-white text-sm font-semibold">
                {doc.name}
              </h3>

              <div className="flex flex-wrap gap-3 mt-1">
                <span
                  className={`px-2 py-1 rounded-full text-[10px] font-medium ${colors[doc.color]}`}
                >
                  {doc.type}
                </span>

                <span className="text-gray-400 text-sm">
                  {doc.size}
                </span>

                <span className="text-gray-400 text-sm">
                  {doc.department}
                </span>
              </div>
            </div>
          </div>

          <div className="text-gray-400 text-xs mt-4 lg:mt-0">
            {doc.date}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentDocuments;
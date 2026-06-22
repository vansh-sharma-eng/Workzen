// src/Components/Documents/DocumentStats.jsx

import React from "react";
import {
  FileText,
  FilePlus2,
  Shield,
  Upload,
} from "lucide-react";

const DocumentStats = ({ stats }) => {
  const icons = {
    file: FileText,
    generate: FilePlus2,
    shield: Shield,
    upload: Upload,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
      {stats.map((item, index) => {
        const Icon = icons[item.icon];

        return (
          <div
            key={index}
            className="border border-[#1E2235] bg-[#10111C] rounded-md p-4"
          >
            <div className="flex items-center gap-4 h-8">
              <div className="w-8 h-8 rounded-md bg-[#141B33] flex items-center justify-center">
                <Icon className={item.color} size={17} />
              </div>

              <div>
                <h2 className="text-md font-bold text-white">
                  {item.value}
                </h2>

                <p className="text-gray-400 text-[10px]">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DocumentStats;
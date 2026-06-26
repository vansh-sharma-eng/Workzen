import React from "react";
import { FileText } from "lucide-react";

const CompanyDocumentCard = ({ item }) => {
  return (
    <div className="bg-[#14151c] border border-[#272727] rounded-xl h-auto p-3 hover:border-indigo-500 transition">
      <div className="flex gap-4 items-center">
        <div className="w-9 h-9 rounded-md bg-indigo-950 flex items-center justify-center">
          <FileText size={14} className="text-indigo-400" />
        </div>

        <div>
          <h3 className="text-white  text-sm font-medium">
            {item.title}
          </h3>

          <p className="text-gray-400 text-[10px]">
            {item.type} • {item.size}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDocumentCard;
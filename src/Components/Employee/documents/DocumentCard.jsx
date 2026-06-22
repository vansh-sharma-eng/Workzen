import React from "react";
import { Download, Eye, FileText } from "lucide-react";

const DocumentCard = ({ document }) => {
  return (
    <div className="bg-[#10111C] border border-[#1E2235] rounded-md p-6 h-45  flex flex-col">
      <div className="flex items-start gap-4">
        <div className="h-8 w-8 rounded-md bg-[#f6dfe2] flex items-center justify-center">
          <FileText
            size={17}
            className="text-red-600"
          />
        </div>

        <div>
          <h3 className="text-white text-md font-semibold">
            {document.title}
          </h3>

          <p className="text-gray-500 text-xs ">
            {document.date}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <span className="bg-[#eef0ff] text-[#4f46e5] h-5 p-1 font-semibold rounded-md text-xs">
          {document.category}
        </span>
      <p className="text-gray-500 text-sm">
        {document.size}
      </p>
      </div>


      <div className=" flex justify-between pt-6">
        <button className="bg-[#6366F1] hover:bg-[#5457ea] text-white px-2 py-1 rounded-md flex items-center gap-3 font-semibold text-sm transition-all">
          <Download size={17} />
          Download
        </button>

        <button className="flex items-center gap-3 text-white font-semibold text-md">
          <Eye size={16} />
          Preview
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;
import React from "react";
import { Upload } from "lucide-react";

const UploadDocuments = () => {
  return (
    <div className="mt-6 border border-dashed bg-[#10111C] border border-[#1E2235] rounded-md h-[350px] flex flex-col justify-center items-center">
      <Upload
        size={30}
        className="text-gray-500"
      />

      <h2 className="text-white text-xl font-semibold mt-4">
        Upload your documents
      </h2>

      <p className="text-gray-500 mt-2 text-md">
        Upload ID proof, certificates, or other documents
      </p>

      <button className="mt-8 border border-[#1a2035] bg-[#111827] hover:bg-[#1a2238] text-white px-3 py-1 rounded-md flex items-center gap-3 text-md font-medium">
        <Upload size={15} />
        Choose Files
      </button>
    </div>
  );
};

export default UploadDocuments;